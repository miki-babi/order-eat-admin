import CustomerMenuPage, { type CustomerMenuPageProps } from '@/components/customer/order/order-page';

export default function TelegramMenuPage(props: CustomerMenuPageProps) {
    return <CustomerMenuPage {...props} forcedChannel="telegram" />;
}
