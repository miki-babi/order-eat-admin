import CustomerMenuPage, { type CustomerMenuPageProps } from '@/components/customer/menu-page';

export default function TelegramMenuPage(props: CustomerMenuPageProps) {
    return <CustomerMenuPage {...props} forcedChannel="telegram" />;
}
