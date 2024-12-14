import { Preloader } from '@ui';
import { FeedUI } from '@ui-pages';
import { TOrder } from '@utils-types';
import { FC, useEffect } from 'react';
import { useDispatch, useSelector } from '../../services/store';
import {
  getFeedData,
  getFeedOrders,
  getLoading
} from '../../services/slices/FeedDataSlice';

export const Feed: FC = () => {
  const dispatch = useDispatch();
  const loading = useSelector(getLoading);
  const orders: TOrder[] = useSelector(getFeedOrders);

  useEffect(() => {
    const fetchData = async () => {
      try {
        await dispatch(getFeedData());
      } catch (error) {
        console.error('Error fetching feed data:', error);
      }
    };

    fetchData();
  }, [dispatch]);

  if (!orders.length || loading) {
    return <Preloader />;
  }

  const handleGetAllOrders = () => {
    dispatch(getFeedData());
  };

  return <FeedUI orders={orders} handleGetFeeds={handleGetAllOrders} />;
};
