import { Link } from 'next-view-transitions';

import {
  type UserNameAndId,
  type SubscriptionTabs,
} from '@/entities/subscription/types';
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
        <ul>
          {users.map(({ id, name }) => (
            <li key={id}>
              <Button
                variant='link'
                asChild
                onClick={closeDialog}
              >
                <Link href={`/user/${id}`}>{name}</Link>
              </Button>
            </li>
          ))}
        </ul>
      </ScrollArea>
    </TabsContent>
  );
};
