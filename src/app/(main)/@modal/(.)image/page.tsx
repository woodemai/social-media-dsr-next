import ImageDialog from '@/app/(main)/@modal/(.)image/_components/image-dialog';

type ImageModalPageProps = {
  searchParams: {
    url: string;
  };
};

const ImageModalPage = ({ searchParams: { url } }: ImageModalPageProps) => {
  return <ImageDialog url={url} />;
};

export default ImageModalPage;
