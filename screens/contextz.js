import React from 'react';


const renderScene = (route, navigator) => {
    const Component = route.component;
  
    return (
      <Component navigator={navigator} route={route} {...route.passProps} />
    );
  };
  
 const MyApp = () => (
    <Navigator
      ref="navigator"
      style={{ flex: 1 }}
      renderScene={renderScene}
      initialRoute={{
        component: LightboxView
      }}
    />
  );


  export default navigator;