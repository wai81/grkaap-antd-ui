import React from "react";

import { Refine } from "@pankod/refine-core";
import {
  notificationProvider,
  ReadyPage,
  ErrorComponent,
  ConfigProvider,
  Icons,
} from "@pankod/refine-antd";
import "@pankod/refine-antd/dist/reset.css";

//import dataProvider from "@pankod/refine-simple-rest";
import { dataProvider } from "./providers/data-provider/";
import { AntdInferencer } from "@pankod/refine-inferencer/antd";
import routerProvider from "@pankod/refine-react-router-v6";
import { useTranslation } from "react-i18next";
import { RefineKbarProvider } from "@pankod/refine-kbar";
import { ColorModeContextProvider } from "contexts";
import {
  Title,
  Header,
  Sider,
  Footer,
  Layout,
  OffLayoutArea,
} from "components/layout/layout";
import ru_RU from "antd/locale/ru_RU";
import { DatePicker, TimePicker, Calendar } from "./components/ui/";
import format from "moment";
import {
  ProductCreate,
  ProductEdit,
  ProductList,
  ProductShow,
} from "pages/products";

import { API_URL } from "./constants";
import { OrganizationList, OrganizationShow } from "pages/organization";
import { SubunitList } from "pages/sbunit";

function App() {
  const { t, i18n } = useTranslation();

  const i18nProvider = {
    translate: (key: string, params: object) => t(key, params),
    changeLocale: (lang: string) => i18n.changeLanguage(lang),
    getLocale: () => i18n.language,
  };

  return (
    <ColorModeContextProvider>
      <ConfigProvider locale={ru_RU}>
        <RefineKbarProvider>
          <Refine
            //dataProvider={dataProvider("https://api.fake-rest.refine.dev")}
            dataProvider={dataProvider(API_URL)}
            notificationProvider={notificationProvider}
            ReadyPage={ReadyPage}
            catchAll={<ErrorComponent />}
            Title={Title}
            Header={Header}
            Sider={Sider}
            Footer={Footer}
            Layout={Layout}
            OffLayoutArea={OffLayoutArea}
            routerProvider={routerProvider}
            i18nProvider={i18nProvider}
            resources={[
              // {
              //   name: "products",
              //   list: ProductList,
              //   edit: ProductEdit,
              //   show: ProductShow,
              //   create: ProductCreate,
              //   canDelete: true,
              // },
              {
                name: "reference",
                icon: <Icons.BookOutlined />,
              },
              {
                name: "organizations",
                parentName: "reference",
                list: OrganizationList,
                show: OrganizationShow,
                icon: <Icons.ApartmentOutlined />,
              },
              {
                name: "subunits",
                parentName: "reference",
                list: SubunitList,
                //create: AntdInferencer,
                //edit: AntdInferencer,
                show: AntdInferencer,
                icon: <Icons.UsergroupAddOutlined />,
              },
            ]}
          />
        </RefineKbarProvider>
      </ConfigProvider>
    </ColorModeContextProvider>
  );
}

export default App;
