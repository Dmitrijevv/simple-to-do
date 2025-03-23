
import MainPage from "./main-page";
import { Metadata } from "next";
export const metadata: Metadata = {
	title: 'TODO APP'
}

export default function Home() {
  return (
   <div className=''>
    <MainPage/>
   </div>
  );
}
