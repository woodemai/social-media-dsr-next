import ImageItem from './_components/image-item';

type SubscriptionModalPageProps = {
  searchParams: {
    url: string;
  };
};

const SubscriptionModalPage = async ({
  searchParams: { url },
}: SubscriptionModalPageProps) => {
  return (
    <div className='flex size-full items-center justify-center'>
      <ImageItem url={url} />
    </div>
  );
};

export default SubscriptionModalPage;
