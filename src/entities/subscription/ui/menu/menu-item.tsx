import { Link } from 'next-view-transitions';

import {
  type UserNameAndId,
  type SubscriptionTabs,
} from '@/entities/subscription/types';
import { UserAvatar } from '@/features/user';
import { Button } from '@/shared/ui/button';
import { ScrollArea } from '@/shared/ui/scroll-area';
import { TabsContent } from '@/shared/ui/tabs';

type SubscriptionMenuItemProps = {
  value: SubscriptionTabs;
  users: UserNameAndId[];
  closeDialog?: () => void;
};

export const SubscriptionMenuItem = ({
  value,
  users,
  closeDialog,
}: SubscriptionMenuItemProps) => {
  return (
    <TabsContent
      value={value}
      className='rounded-md bg-card p-4 shadow-md'
    >
      <ScrollArea className='h-72 w-full min-w-72'>
        {!users.length && <h3>В списке никого нет!</h3>}
        <ul className='space-y-4'>
          {users.map(({ id, name, bio, image }) => (
            <li key={id}>
              <Button
                variant='link'
                asChild
                onClick={closeDialog}
              >
                <Link href={`/user/${id}`}>
                  <div className='flex gap-x-4 items-center'>
                    <UserAvatar src={image} alt={`${name} avatar`} />
                    <div>
                      <h4 className='font-bold'>{name}</h4>
                      <p className='text-muted-foreground'>{bio}</p>
                    </div>
                  </div>
                </Link>
              </Button>
            </li>
          ))}
        </ul>
      </ScrollArea>
    </TabsContent>
  );
};
