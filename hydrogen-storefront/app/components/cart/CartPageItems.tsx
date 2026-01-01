import type {CartApiQueryFragment} from 'storefrontapi.generated';
import {CartLineItem} from '~/components/CartLineItem';

interface Props {
  cart: CartApiQueryFragment | null;
}

export default function CartPageItems({cart}: Props) {
  return (
    <div>
      <ul>
        {(cart?.lines?.nodes ?? []).map((line) => (
          <CartLineItem key={line.id} line={line} layout={'page'} />
        ))}
      </ul>
    </div>
  );
}
