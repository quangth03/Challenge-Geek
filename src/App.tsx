import { Refine } from "@refinedev/core";
import { DevtoolsProvider } from "@refinedev/devtools";
import { RefineKbar, RefineKbarProvider } from "@refinedev/kbar";

import {
  ErrorComponent,
  ThemedLayoutV2,
  ThemedSiderV2,
  useNotificationProvider,
} from "@refinedev/antd";
import "@refinedev/antd/dist/reset.css";

import routerBindings, {
  DocumentTitleHandler,
  NavigateToResource,
  UnsavedChangesNotifier,
} from "@refinedev/react-router";
import dataProvider from "@refinedev/simple-rest";
import { App as AntdApp } from "antd";
import { BrowserRouter, Outlet, Route, Routes } from "react-router";
import { Header } from "./components/header";
import {
  AlbumList,
  AlbumShow,
} from "./pages/album";
import {
  UserList,
  UserShow,
} from "./pages/user";

function App() {
  return (
    <BrowserRouter>
      <RefineKbarProvider>
        <AntdApp>
          <DevtoolsProvider>
            <Refine
              dataProvider={dataProvider("https://jsonplaceholder.typicode.com")}
              notificationProvider={useNotificationProvider}
              routerProvider={routerBindings}
              resources={[
                {
                  name: "albums", //"https://jsonplaceholder.typicode.com/albums"
                  list: "/albums",
                  show: "/albums/:id",
                },
                {
                  name: "users",
                  list: "/users",
                  show: "/users/:id",
                },
              ]}
              options={{
                syncWithLocation: true,
                warnWhenUnsavedChanges: true,
                useNewQueryKeys: true,
              }}
            >
              <Routes>
                <Route
                  element={
                    <ThemedLayoutV2
                      Header={() => <Header sticky />}
                      Sider={(props) => <ThemedSiderV2 {...props} fixed />}
                    >
                      <Outlet />
                    </ThemedLayoutV2>
                  }
                >
                  <Route
                    index
                    element={<NavigateToResource resource="albums" />}
                  />
                  <Route path="/albums">
                    <Route index element={<AlbumList />} />
                    <Route path=":id" element={<AlbumShow />} />
                  </Route>
                  <Route path="/users">
                    <Route index element={<UserList />} />
                    <Route path=":id" element={<UserShow />} />
                  </Route>
                  <Route path="*" element={<ErrorComponent />} />
                </Route>
              </Routes>
              <RefineKbar />
              <UnsavedChangesNotifier />
              <DocumentTitleHandler />
            </Refine>
          </DevtoolsProvider>
        </AntdApp>
      </RefineKbarProvider>
    </BrowserRouter>
  );
}

export default App;
