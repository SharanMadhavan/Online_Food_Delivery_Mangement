import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Order {
  id: number;
  userId: number;
  restaurantId: number;
  items: any[];
  totalAmount: number;
  status: string;
  createdAt: string;
}

interface OrderState {
  orders: Order[];
  currentOrder: Order | null;
  loading: boolean;
}

const initialState: OrderState = {
  orders: [],
  currentOrder: null,
  loading: false,
};

const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    setOrders: (state, action: PayloadAction<Order[]>) => {
      state.orders = action.payload;
    },
    
    setCurrentOrder: (state, action: PayloadAction<Order>) => {
      state.currentOrder = action.payload;
    },
    
    addOrder: (state, action: PayloadAction<Order>) => {
      state.orders.unshift(action.payload);
      state.currentOrder = action.payload;
    },
    
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
  },
});

export const { setOrders, setCurrentOrder, addOrder, setLoading } = orderSlice.actions;
export default orderSlice.reducer;
