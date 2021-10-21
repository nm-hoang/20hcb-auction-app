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
import { WatchlistType } from '../../types/watchlistType';
import Notify from '../../helpers/notify';

interface IProductSliceState extends IState<Product> {
  listNextClose?: Product[];
  listHighestBidTurns?: Product[];
  listHighestPrice?: Product[];
  total?: number;
  bidLogs?: BidLogType[];
  bidLog?: BidLogType;
  watchlist?: WatchlistType;
}

const productDomain = 'product';
const watchlistDomain = 'watchlist';

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

export const getWatchlist = createAsyncThunk(
  `${watchlistDomain}/getWatchlist`,
  async () => productApi.retrieveWatchlistByOwnerUUID(),
);

export const addProductToWatchlist = createAsyncThunk(
  `${watchlistDomain}/addToWatchlist`,
  async (
    { productId }: { productId: string },
  ) => productApi.addProductToWatchlist(productId),
);

export const createProduct = createAsyncThunk(
  `${productDomain}/createProduct`,
  async (product: Product) => productApi.createProduct(product),
);

function mapProductWithWatchlist(product: Product) {
  return {
    ...product,
    isWatching: !product.isWatching,
  };
}

const productSlice = createSlice({
  name: productDomain,
  initialState,
  reducers: {},
  extraReducers: ((builder) => {
    builder
      .addCase(getProductCount.pending, (state: IProductSliceState) => {
        state.requesting = true;
      })
      .addCase(getProductCount.fulfilled, (state: IProductSliceState, action: any) => {
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
      .addCase(getProduct.fulfilled, (state: IProductSliceState, action: any) => {
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
      })
      .addCase(getWatchlist.pending, (state: IProductSliceState) => {
        state.requesting = true;
        state.success = false;
      })
      .addCase(getWatchlist.fulfilled, (state: IProductSliceState, action: any) => {
        state.requesting = false;
        state.success = true;
        state.watchlist = action.payload;
      })
      .addCase(getWatchlist.rejected, (state: IProductSliceState, action: any) => {
        state.requesting = false;
        state.success = false;
        state.error = action.payload;
      })
      .addCase(addProductToWatchlist.pending, (state: IProductSliceState) => {
        state.requesting = true;
        state.success = false;
      })
      .addCase(addProductToWatchlist.fulfilled, (state: IProductSliceState, action: any) => {
        state.requesting = false;
        state.success = true;
        state.watchlist = action.payload;

        state.list = state.list?.map((product) => {
          if (product._id === action.payload.productId) {
            return mapProductWithWatchlist(product);
          }

          return product;
        });

        state.listHighestBidTurns = state.listHighestBidTurns?.map((product) => {
          if (product._id === action.payload.productId) {
            return mapProductWithWatchlist(product);
          }

          return product;
        });

        state.listHighestPrice = state.listHighestPrice?.map((product) => {
          if (product._id === action.payload.productId) {
            return mapProductWithWatchlist(product);
          }

          return product;
        });

        state.listNextClose = state.listNextClose?.map((product) => {
          if (product._id === action.payload.productId) {
            return mapProductWithWatchlist(product);
          }

          return product;
        });

        if (state.single) {
          state.single = mapProductWithWatchlist(state.single);
        }
      })
      .addCase(addProductToWatchlist.rejected, (state: IProductSliceState, action: any) => {
        state.requesting = false;
        state.success = false;
        state.error = action.payload;
        console.log(action.payload);
        Notify.error(action.payload, 'Place failed');
      })
      .addCase(createProduct.pending, (state: IProductSliceState) => {
        state.requesting = true;
      })
      .addCase(createProduct.fulfilled, (state: IProductSliceState, action: any) => {
        state.requesting = false;
        state.success = true;
        console.log(action);
      })
      .addCase(createProduct.rejected, (state: IProductSliceState, action: any) => {
        state.requesting = false;
        state.error = action.payload;
      });
  }),
});

export const selectProduct = (state: RootState) => state.product;

export const selectProductList = createSelector(
  [selectProduct],
  (state: IProductSliceState) => state.list,
);

export const selectProductWatchlist = (state: RootState) => state.product.watchlist;

export const selectRequesting = createSelector(
  [selectProduct],
  (state: IProductSliceState) => state.requesting,
);

export default productSlice.reducer;
