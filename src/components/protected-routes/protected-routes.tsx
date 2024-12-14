import { Navigate, useLocation } from 'react-router-dom';
import { selectUserCheck, selectUser } from '../../services/slices/UserSlice';
import { useSelector } from '../../services/store';
import { Preloader } from '../../components/ui/preloader';

type ProtectedRoutesProps = {
  isPublic?: boolean;
  children: React.ReactElement;
};

export const ProtectedRoute = ({
  isPublic,
  children
}: ProtectedRoutesProps) => {
  const checkUser = useSelector(selectUserCheck);
  const user = useSelector(selectUser);
  const location = useLocation();

  if (!checkUser) {
    return <Preloader />;
  }

  if (isPublic && user) {
    const from = location.state?.from || { pathname: '/' };
    return <Navigate replace to={from} />;
  }

  if (!isPublic && !user) {
    return <Navigate replace to='/login' state={{ from: location }} />;
  }

  return children;
};
