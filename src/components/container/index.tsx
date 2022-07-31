import React from 'react';
import {
  StatusBar,
  SafeAreaView,
  ScrollView,
  RefreshControl,
} from 'react-native';
import {Colors} from '@utils/index';

interface iCallbackState {
  routeName?: string;
  func: () => Promise<any>;
}

export const ContainerContext = React.createContext({
  isRefreshing: false,
  setRefreshCallback: (f: {routeName?: string; func: () => Promise<any>}) => {
    console.log('Refresh callback param: ', f);
  },
  setOnBottomCallback: (f: {routeName?: string; func: () => Promise<any>}) => {
    console.log('Refresh callback param: ', f);
  },
});

interface hocProps {
  children: any;
  route: any;
}

const container =
  (Comp: any, isScrollView: boolean = true, bgColor: string = Colors.WHITE) =>
  (props: hocProps) => {
    const [isRefreshing, setIsRefreshing] = React.useState(false);
    const [callbacks, setClbks] = React.useState<iCallbackState[]>([]);
    const [callbacksBottom, setClbksBottom] = React.useState<iCallbackState[]>(
      [],
    );

    const setRefreshCallback = (f: iCallbackState) => {
      f.routeName = props?.route?.name;

      setClbks([
        ...callbacks.filter(callback => callback.routeName !== f.routeName),
        f,
      ]);
    };

    const setOnBottomCallback = (f: iCallbackState) => {
      f.routeName = props?.route?.name;

      setClbksBottom([
        ...callbacksBottom.filter(
          callback => callback.routeName !== f.routeName,
        ),
        f,
      ]);
    };

    const refreshCallback: () => void = () => {
      setIsRefreshing(true);
    };

    const isCloseToBottom = ({
      layoutMeasurement,
      contentOffset,
      contentSize,
    }: any) => {
      const paddingToBottom = 250;
      return (
        layoutMeasurement.height + contentOffset.y >=
        contentSize.height - paddingToBottom
      );
    };

    React.useEffect(() => {
      if (isRefreshing) {
        if (callbacks.length > 0) {
          Promise.all(callbacks.map(callback => callback.func())).then(() => {
            setIsRefreshing(false);
          });
        } else {
          setIsRefreshing(false);
        }
      }

      return () => {};
    }, [isRefreshing]);

    const onReachBottom = () => {
      if (callbacksBottom.length > 0) {
        Promise.all(callbacksBottom.map(callback => callback.func()));
      } else {
        console.log('lazy load unavailable');
      }
    };

    return (
      <>
        <StatusBar barStyle={'dark-content'} backgroundColor={Colors.WHITE} />
        <SafeAreaView style={{flex: 1, backgroundColor: bgColor}}>
          {isScrollView && (
            <ContainerContext.Provider
              value={{isRefreshing, setRefreshCallback, setOnBottomCallback}}
            >
              <ScrollView
                contentInsetAdjustmentBehavior="automatic"
                contentContainerStyle={{minHeight: '100%'}}
                refreshControl={
                  <RefreshControl
                    refreshing={isRefreshing}
                    onRefresh={refreshCallback}
                  />
                }
                onScroll={({nativeEvent}) => {
                  if (isCloseToBottom(nativeEvent)) {
                    onReachBottom();
                  }
                }}
                scrollEventThrottle={400}
              >
                <Comp {...props}>{props?.children}</Comp>
              </ScrollView>
            </ContainerContext.Provider>
          )}
          {!isScrollView && <Comp {...props}>{props?.children}</Comp>}
        </SafeAreaView>
      </>
    );
  };

export default container;
