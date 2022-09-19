import { useNavigate, useParams } from 'react-router-dom';
import { useWorker, useAuthContext, useCategory } from '../hooks';
import { WriteView } from '../components/Write/WriteView';
import { useItemWriteDetail, useItemWriteForm } from '../hooks/Write';

export const Write = () => {
  const { id: itemId } = useParams();
  const navigate = useNavigate();
  const { user, isLoggedIn } = useAuthContext('Write');
  const { category: categories } = useCategory();
  const worker = useWorker();

  const { info, setInfo } = useItemWriteDetail(itemId, user);
  const {
    checkValidation,
    onFileInputChange,
    onImageDeleteClick,
    onInputTextChange,
    onSubmit,
  } = useItemWriteForm(itemId, info, setInfo, navigate, worker);

  return (
    <WriteView
      onSubmit={onSubmit}
      categories={categories}
      checkValidation={checkValidation}
      info={info}
      isLoggedIn={isLoggedIn}
      navigate={navigate}
      onFileInputChange={onFileInputChange}
      onImageDeleteClick={onImageDeleteClick}
      onInputTextChange={onInputTextChange}
      user={user}
    />
  );
};
