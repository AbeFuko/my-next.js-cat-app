/** @type {import('next').NextConfig} */
const nextConfig = {
    // [next/image]コンポーネントは、画像の最適化とパフォーマンス向上のために、外部ホストからの画像を許可するドメインを明示的に指定する必要があります。
    // これにより、セキュリティとパフォーマンスの管理がしやすくなります。指定されていないドメインからの画像はデフォルトでブロックされます。
  images: {
    domains: ['cdn2.thecatapi.com'],
  },
};

export default nextConfig;