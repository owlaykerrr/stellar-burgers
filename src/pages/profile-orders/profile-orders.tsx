import { ProfileOrdersUI } from '@ui-pages';
import { TOrder } from '@utils-types';
import { FC, useEffect } from 'react';
import { useDispatch, useSelector } from '../../services/store';
import {
  getUserOrdersHistory,
  getUserOrdersLoading,
  ordersHistory
} from '../../services/slices/UserOrdersHistorySlice';
import { Preloader } from '@ui';

export const ProfileOrders: FC = () => {
  const dispatch = useDispatch();
  const orders: TOrder[] = useSelector(getUserOrdersHistory);
  const isLoad = useSelector(getUserOrdersLoading);

  useEffect(() => {
    dispatch(ordersHistory());
  }, []);

  if (isLoad) {
    return <Preloader />;
  }

  return <ProfileOrdersUI orders={orders} />;
};
