import {
  createAsyncThunk, createSelector, createSlice,
} from '@reduxjs/toolkit';
import { IState } from '../../types/stateType';
import {
  FetchProductBidLogsQuery, FetchProductOptions, PatchPlaceBidQuery, Product,
} from '../../types/productType';
import productApi from '../../api/productApi';
import { RootState } from '../../app/store';
import { BidLogType } from '../../types/bidLogType';

interface IProductSliceState extends IState<Product> {
  listNextClose?: Product[];
  listHighestBidTurns?: Product[];
  listHighestPrice?: Product[];
  total?: number;
  bidLogs?: BidLogType[];
  bidLog?: BidLogType;
}

const productDomain = 'product';

const initialState: IProductSliceState = {
  requesting: false,
  list: [],
};

export const getProductCount = createAsyncThunk(
  `${productDomain}/getProductCount`,
  async () => productApi.getCount(),
);

export const getProducts = createAsyncThunk(
  `${productDomain}/getProducts`,
  async (fetchOption: FetchProductOptions) => productApi.getProducts(fetchOption),
);

export const getProduct = createAsyncThunk(
  `${productDomain}/getProduct`,
  async (id: string) => productApi.getProduct(id),
);

export const getTopFiveProducts = createAsyncThunk(
  `${productDomain}/getTopFiveProducts`,
  async () => productApi.getFiveProducts(),
);

export const getProductBidLogs = createAsyncThunk(
  `${productDomain}/getProductBidLogs`,
  async (
    fetchBidLogQuery: FetchProductBidLogsQuery,
  ) => productApi.getProductBidLogs(fetchBidLogQuery),
);

export const patchPlaceBid = createAsyncThunk(
  `${productDomain}/patchPlaceBid`,
  async (
    patchPlaceBidQuery: PatchPlaceBidQuery,
  ) => productApi.placeBid(patchPlaceBidQuery),
);

const productSlice = createSlice({
  name: productDomain,
  initialState,
  reducers: {},
  extraReducers: ((builder) => {
    builder
      .addCase(getProductCount.pending, (state: IProductSliceState) => {
        state.requesting = true;
      })
      .addCase(getProductCount.fulfilled, (state: IProductSliceState, action) => {
        state.requesting = false;
        state.total = action.payload.count;
      })
      .addCase(getProducts.pending, (state: IProductSliceState) => {
        state.requesting = true;
      })
      .addCase(getProducts.fulfilled, (state: IProductSliceState, action: any) => {
        state.requesting = false;
        state.success = true;
        state.list = action.payload;
      })
      .addCase(getProducts.rejected, (state: IProductSliceState, action: any) => {
        state.requesting = false;
        state.error = action.payload;
      })
      .addCase(getProduct.pending, (state: IProductSliceState) => {
        state.requesting = true;
      })
      .addCase(getProduct.fulfilled, (state: IProductSliceState, action) => {
        state.requesting = false;
        state.success = true;
        state.single = action.payload;
      })
      .addCase(getProduct.rejected, (state: IProductSliceState, action) => {
        state.requesting = false;
        state.error = action.payload;
      })
      .addCase(getTopFiveProducts.pending, (state: IProductSliceState) => {
        state.requesting = true;
      })
      .addCase(getTopFiveProducts.fulfilled, (state: IProductSliceState, action: any) => {
        state.requesting = false;
        state.success = true;
        state.listNextClose = action.payload.nextCloseProducts;
        state.listHighestBidTurns = action.payload.highestBidTurnsProducts;
        state.listHighestPrice = action.payload.highestPriceProducts;
      })
      .addCase(getTopFiveProducts.rejected, (state: IProductSliceState, action: any) => {
        state.requesting = false;
        state.error = action.payload;
      })
      .addCase(getProductBidLogs.pending, (state: IProductSliceState) => {
        state.requesting = true;
      })
      .addCase(getProductBidLogs.fulfilled, (state: IProductSliceState, action: any) => {
        state.requesting = false;
        state.success = true;
        state.bidLogs = action.payload;
      })
      .addCase(getProductBidLogs.rejected, (state: IProductSliceState, action: any) => {
        state.requesting = false;
        state.success = false;
        state.error = action.payload;
      })
      .addCase(patchPlaceBid.pending, (state: IProductSliceState) => {
        state.requesting = true;
      })
      .addCase(patchPlaceBid.fulfilled, (state: IProductSliceState, action: any) => {
        state.requesting = false;
        state.success = true;
        state.bidLog = action.payload;
        if (state.bidLogs) {
          state.bidLogs = [
            ...state.bidLogs,
            action.payload,
          ];
        }
      })
      .addCase(patchPlaceBid.rejected, (state: IProductSliceState, action: any) => {
        state.requesting = false;
        state.error = action.payload;
        console.log(action.payload);
      });
  }),
});

export const selectProduct = (state: RootState) => state.product;

export const selectProductList = createSelector(
  [selectProduct],
  (state: IProductSliceState) => state.list,
);

export default productSlice.reducer;
