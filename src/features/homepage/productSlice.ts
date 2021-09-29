import {
  createAsyncThunk, createSelector, createSlice,
} from '@reduxjs/toolkit';
import { IState } from '../../types/stateType';
import { FetchProductOptions, Product } from '../../types/productType';
import productApi from '../../api/productApi';
import { RootState } from '../../app/store';

interface IHomePageState extends IState<Product> {
  listNextClose?: Product[]
  listHighestBidTurns?: Product[]
  listHighestPrice?: Product[]
}

const productDomain = 'product';

const initialState: IHomePageState = {
  requesting: false,
  list: [],
};

export const getProducts = createAsyncThunk(
  `${productDomain}/getProducts`,
  async (fetchOption: FetchProductOptions) => productApi.getProducts(fetchOption),
);

export const getTopFiveProducts = createAsyncThunk(
  `${productDomain}/getTopFiveProducts`,
  async () => productApi.getFiveProducts(),
);

const productSlice = createSlice({
  name: productDomain,
  initialState,
  reducers: {},
  extraReducers: ((builder) => {
    builder
      .addCase(getProducts.pending, (state: IHomePageState) => {
        state.requesting = true;
      })
      .addCase(getProducts.fulfilled, (state: IHomePageState, action: any) => {
        state.requesting = false;
        state.success = true;
        state.list = action.payload;
      })
      .addCase(getProducts.rejected, (state: IHomePageState, action: any) => {
        state.requesting = false;
        state.error = action.payload;
      })
      .addCase(getTopFiveProducts.pending, (state: IHomePageState) => {
        state.requesting = true;
      })
      .addCase(getTopFiveProducts.fulfilled, (state: IHomePageState, action: any) => {
        state.requesting = false;
        state.success = true;
        state.listNextClose = action.payload.nextCloseProducts;
        state.listHighestBidTurns = action.payload.highestBidTurnsProducts;
        state.listHighestPrice = action.payload.highestPriceProducts;
      })
      .addCase(getTopFiveProducts.rejected, (state: IHomePageState, action: any) => {
        state.requesting = false;
        state.error = action.payload;
      });
  }),
});

export const selectProduct = (state: RootState) => state.product;

export const selectProductList = createSelector(
  [selectProduct],
  (state: IHomePageState) => state.list,
);

export default productSlice.reducer;
