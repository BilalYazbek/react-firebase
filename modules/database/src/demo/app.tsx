import * as React from "react";
import * as firebase from "firebase/app";
import "firebase/database";
import { State } from "react-powerplug";
//@ts-ignore
import { View, Text, FlatList } from "react-native-web";
//@ts-ignore
import Component from "@reach/component-component";

import { config } from "./test-credentials";

import { FirebaseDatabaseNode, FirebaseDatabaseProvider } from "../index";
import { FirebaseDatabaseMutation } from "../components/FirebaseDatabaseMutation";
import { FirebaseDatabaseTransaction } from "../components/FirebaseDatabaseTransaction";
import ReactJson from "react-json-view";

const s = (v: any) => JSON.stringify(v, null, 2);

export const FirebaseDatabaseList = () => (
  <div>
    <State initial={{ limit: 2 }}>
      {({ state, setState }) => (
        <FirebaseDatabaseNode
          path="user_bookmarks/"
          limitToFirst={state.limit}
          orderByValue={"created_on"}
        >
          {d => {
            return (
              <>
                <pre>Path {d.path}</pre>
                <pre style={{ height: 300, overflow: "auto" }}>
                  Value {JSON.stringify(d.value, null, 2)}
                </pre>
                <button
                  onClick={() => {
                    setState({ limit: state.limit + 1 });
                  }}
                >
                  Load more
                </button>
              </>
            );
          }}
        </FirebaseDatabaseNode>
      )}
    </State>
  </div>
);

export const FirebaseDatabaseItem = () => (
  <div>
    <FirebaseDatabaseNode path="user_bookmarks/a">
      {d => {
        return <ReactJson src={d} />;
      }}
    </FirebaseDatabaseNode>
  </div>
);

export const TransactionExample = () => (
  <FirebaseDatabaseTransaction path="user_bookmarks/a/usage_count">
    {({ runTransaction }) => {
      return (
        <div>
          <button
            onClick={() => {
              runTransaction({
                reducer: val => {
                  if (val === null) {
                    return 1;
                  } else {
                    return val + 1;
                  }
                }
              }).then(() => {
                console.log("Ran transaction");
              });
            }}
          >
            Click me to run transaction
          </button>
        </div>
      );
    }}
  </FirebaseDatabaseTransaction>
);

export const MutationExample = () => (
  <div>
    <FirebaseDatabaseMutation type="set" path="user_bookmarks/a">
      {({ runMutation }) => {
        return (
          <div>
            <button
              onClick={() => {
                runMutation({
                  new_data: "Oh hai",
                  updated_at: firebase.database.ServerValue.TIMESTAMP,
                  now: Date.now()
                }).then(() => {
                  console.log("Ran mutation");
                });
              }}
            >
              Click me to run mutation
            </button>
          </div>
        );
      }}
    </FirebaseDatabaseMutation>
  </div>
);

export const FirebaseTwoNodesSameLevelSamePath = () => {
  return (
    <React.Fragment>
      <FirebaseDatabaseNode path="user_bookmarks/a">
        {d => {
          return <ReactJson src={d} />;
        }}
      </FirebaseDatabaseNode>
      <div>
        <FirebaseDatabaseNode path="user_bookmarks/a">
          {d => {
            return <ReactJson src={d} />;
          }}
        </FirebaseDatabaseNode>
      </div>
    </React.Fragment>
  );
};

export const InfiniteList = () => (
  <View>
    <Component initialState={{ limit: 5 }}>
      {(component: any) => (
        <FirebaseDatabaseNode
          path="user_bookmarks"
          limitToFirst={component.state.limit}
        >
          {({ value }) => {
            if (value === null || typeof value === "undefined") return null;
            const keys = Object.keys(value);
            const values = Object.values(value);
            return (
              <FlatList
                style={{ height: 200, overflow: "auto" }}
                data={values}
                //@ts-ignore
                keyExtractor={(v, i) => keys[i]}
                //@ts-ignore
                renderItem={v => (
                  <View>
                    <Text>{s(v)}</Text>
                  </View>
                )}
                onEndReached={() => {
                  component.setState({ limit: component.state.limit + 1 });
                }}
              />
            );
          }}
        </FirebaseDatabaseNode>
      )}
    </Component>
  </View>
);

export const App = () => {
  return (
    <FirebaseDatabaseProvider firebase={firebase} {...config}>
      <InfiniteList />
      <InfiniteList />
    </FirebaseDatabaseProvider>
    // <FirebaseDatabaseProvider {...config} firebase={firebase}>
    //   <FirebaseDatabaseNode path="user_bookmarks/" limitToFirst={5} keysOnly>
    //     {d => {
    //       return <ReactJson src={d} />;
    //     }}
    //   </FirebaseDatabaseNode>
    //   {/* <FirebaseTwoNodesSameLevelSamePath />
    //   <FirebaseDatabaseList />
    //   <FirebaseDatabaseList />
    //   <FirebaseDatabaseItem />
    //   <TransactionExample />
    //   <MutationExample /> */}
    // </FirebaseDatabaseProvider>
  );
};
