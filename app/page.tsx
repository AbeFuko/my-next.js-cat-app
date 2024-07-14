'use client';
import axios from "axios";
import Image from "next/image";
import { useState, useEffect } from "react";
import 'semantic-ui-css/semantic.min.css';
import { Loader } from 'semantic-ui-react';

// interfaceで型定義
interface CatImage {
  id: string;
  url: string;
  width: number;
  height: number;
}

// 猫の画像を取得する非同期関数
const getCatImage = async () => {
  const res = await axios.get('https://api.thecatapi.com/v1/images/search');
  return res.data[0];
};

export default function Home() {
  // 状態管理のためのフック
  const [catImage, setCatImage] = useState<CatImage | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [fadeClass, setFadeClass] = useState('');

  // 猫の画像をフェッチする関数
  const fetchCatImage = async () => {
    setLoading(true); // ローディング状態を開始
    setError(null); // エラーをリセット

    try {
      const res = await getCatImage(); // 画像を取得
      setCatImage(res); // 取得した画像を状態にセット
      setFadeClass('animate-fade-in'); // フェードインアニメーションを適用
    } catch (e) {
      setError('Failed to fetch image...'); // エラーが発生した場合の処理
    } finally {
      setLoading(false); // ローディング状態を終了
    }
  };

  // 初回レンダリング時とcatImageが変わるたびに実行される
  useEffect(() => {
    fetchCatImage();
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-3 bg-gray-100">
      <h1 className="text-4xl font-bold mb-8 fixed top-8 text-gray-800">Cat Image Fetcher</h1>
      {error && <p className="text-red-500 mt-4">{error}</p>} {/* エラーがある場合に表示 */}
      {loading && <Loader active inline="centered" size="huge" />} {/* ローディング中にLoaderを表示 */}
      {catImage && !loading && (
        <div className={`w-full max-w-md ${fadeClass}`}>
          <Image
            src={catImage.url}
            alt="A cute cat"
            layout="responsive"
            width={catImage.width}
            height={catImage.height}
            className="rounded-lg shadow-lg w-full h-auto"
            style={{ maxHeight: 'calc(100vh - 200px)', maxWidth: '100%' }}
          />
        </div>
      )}
      <button
        onClick={fetchCatImage} // ボタンがクリックされたときに画像をフェッチ
        className="px-4 py-2 my-8 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-300 fixed bottom-16 shadow-md"
      >
        {loading ? 'Loading...' : '押す'} {/* ローディング中は「Loading...」を表示 */}
      </button>
    </div>
  );
}