"use client";
import "./globals.css";
import { Inter } from "next/font/google";
import store from "../../store/store";
import { Provider } from "react-redux";
import Menubar from "../../components/Menubar";
import Logic from "../../components/Logic";
import UsernameComp from "../../components/UsernameComp";

const inter = Inter({ subsets: ["latin"] });

//export const metadata = {
//  title: "Create Next App",
//  description: "Generated by create next app",
//};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Provider store={store}>
          <Logic />
          <Menubar />
          <div className="w-full h-full bg-slate-800 flex">{children}</div>
        </Provider>
      </body>
    </html>
  );
}
