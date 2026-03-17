import { getSiteData } from "@/lib/data";
import ClientPage from "./ClientPage";

export const revalidate = 60; // 开启 ISR，每 60 秒在后台重新验证并更新一次缓存

export default async function Home() {
  const siteData = await getSiteData();

  return <ClientPage siteData={siteData} />;
}
