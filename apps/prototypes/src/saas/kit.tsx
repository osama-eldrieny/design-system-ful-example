/**
 * Card building blocks for Orbit: titled panels with an options menu and trend badges.
 * Library components only.
 */
import type { ReactNode } from 'react';
import {
  Badge,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  Card,
  CardFooter,
  CardHeader,
  IconButton,
} from '@ds/react';
import { ArrowDownRight, ArrowUpRight, MoreVertical } from 'lucide-react';

export const More = ({ label }: { label: string }) => (
  <DropdownMenu>
    <DropdownMenuTrigger asChild>
      <IconButton
        icon={<MoreVertical />}
        label={label}
        variant="secondary"
        appearance="ghost"
        size="small"
      />
    </DropdownMenuTrigger>
    <DropdownMenuContent align="end">
      <DropdownMenuItem>View report</DropdownMenuItem>
      <DropdownMenuItem>Export</DropdownMenuItem>
      <DropdownMenuItem>Hide</DropdownMenuItem>
    </DropdownMenuContent>
  </DropdownMenu>
);

/** A titled card: the library's Card with CardHeader and a divided CardFooter. */
export function Panel({
  title,
  description,
  actions,
  menu = false,
  footer,
  className,
  children,
}: {
  title?: ReactNode;
  description?: ReactNode;
  actions?: ReactNode;
  menu?: boolean;
  footer?: ReactNode;
  className?: string;
  children: ReactNode;
}) {
  return (
    <Card as="section" className={className}>
      {title && (
        <CardHeader
          titleAs="h2"
          title={title}
          description={description}
          actions={
            (actions || menu) && (
              <>
                {actions}
                {menu && (
                  <More label={`Options for ${typeof title === 'string' ? title : 'this card'}`} />
                )}
              </>
            )
          }
        />
      )}
      {children}
      {footer && <CardFooter divided>{footer}</CardFooter>}
    </Card>
  );
}

/** A trend shown as a small tinted badge, e.g. ↗ 7.4%. */
export const Trend = ({
  value,
  up = true,
  good,
}: {
  value: string;
  up?: boolean;
  good?: boolean;
}) => (
  <Badge
    tone={(good ?? up) ? 'success' : 'danger'}
    shape="modern"
    size="small"
    iconStart={up ? <ArrowUpRight /> : <ArrowDownRight />}
  >
    {value}
  </Badge>
);

