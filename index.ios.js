import React, {Component} from 'react';
import {
  AppRegistry,
  StyleSheet,
  Animated,
  TouchableOpacity,
  Dimensions,
  StatusBar,
  Easing,
  TextInput
} from 'react-native';
import Carousel from './src/components/Carousel';
import HttpUtil from './src/common/HttpUtil';
import {Image, Text, View} from 'react-native-animatable';

const {width, height} = Dimensions.get('window');
let pageNumber = 0;

export default class fourtimes extends Component {
  constructor(props) {
    super(props);
    this.state = {
      leftAnmValue: new Animated.Value(0),
      topAnmValue: new Animated.Value(0),
      size: {width, height},
      toggledOn: false,
      page: 0,
      leftPage: 1,
      cityText: ''
    }
  }

  componentDidMount() {
    // 0: home, 1: setting, 2: location, 3: more

    _leftAnmValueHandler_0 = Animated.timing(this.state.leftAnmValue, {
      toValue: 0,
      duration: 500,
      easing: Easing.bezier(0.86, 0.18, 0.82, 1.32)
    });
    _topAnmValueHandler_0 = Animated.timing(this.state.topAnmValue, {
      toValue: 0,
      duration: 500,
      easing: Easing.bezier(0.86, 0.18, 0.82, 1.32)
    });

    _leftAnmValueHandler_1 = Animated.timing(this.state.leftAnmValue, {
      toValue: 213 / 375 * width,
      duration: 500,
      easing: Easing.bezier(0.86, 0.18, 0.82, 1.32)
    });
    _topAnmValueHandler_1 = Animated.timing(this.state.topAnmValue, {
      toValue: 245 / 667 * height,
      duration: 500,
      easing: Easing.bezier(0.86, 0.18, 0.82, 1.32)
    });

    _leftAnmValueHandler_2 = Animated.timing(this.state.leftAnmValue, {
      toValue: -315 / 375 * width,
      duration: 500,
      easing: Easing.bezier(0.86, 0.18, 0.82, 1.32)
    });
    _topAnmValueHandler_2 = Animated.timing(this.state.topAnmValue, {
      toValue: 580 / 667 * height,
      duration: 500,
      easing: Easing.bezier(0.86, 0.18, 0.82, 1.32)
    });
  }

  _clickMore() {
    if (pageNumber === 0) {
      _leftAnmValueHandler_1.start && _leftAnmValueHandler_1.start();
      _topAnmValueHandler_1.start && _topAnmValueHandler_1.start();
      pageNumber = 1
    }
    else if (pageNumber === 1) {
      _leftAnmValueHandler_0.start && _leftAnmValueHandler_0.start();
      _topAnmValueHandler_0.start && _topAnmValueHandler_0.start();
      pageNumber = 0
    }
  }

  _clickLocation() {
    if (pageNumber === 0) {
      _leftAnmValueHandler_2.start && _leftAnmValueHandler_2.start();
      _topAnmValueHandler_2.start && _topAnmValueHandler_2.start();
      pageNumber = 2
    }
    else if (pageNumber === 2) {
      _leftAnmValueHandler_0.start && _leftAnmValueHandler_0.start();
      _topAnmValueHandler_0.start && _topAnmValueHandler_0.start();
      pageNumber = 0
    }
  }

  _onLayoutDidChange = (e) => {
    const layout = e.nativeEvent.layout;
    this.setState({size: {width: layout.width, height: layout.height}});
  };

  _pushMorePage() {
    // this.refs.card1.transitionTo({opacity: 0.2});
  }

  render() {
    const {toggledOn} = this.state;
    let pageView;
    let homeView;
    if (this.state.page === 1) {
      pageView = <View>
        <View style={styles.leftCardTop}>
          <TouchableOpacity onPress={() => {
            this._clickMore();
            this.setState({
              leftPage: 1
            })
          }}>
            <Image source={require('./res/images/left-card-weather.png')}/>
          </TouchableOpacity>
        </View>
        <View style={styles.leftCard}>
          <TouchableOpacity onPress={() => {
            this._clickMore();
            this.setState({
              leftPage: 2
            })
          }}>
            <Image source={require('./res/images/left-card-author.png')}/>
          </TouchableOpacity>
        </View>
        <View style={styles.leftCard}>
          <TouchableOpacity onPress={() => {
            this._clickMore();
            this.setState({
              leftPage: 3
            })
          }}>
            <Image source={require('./res/images/left-card-feedback.png')}/>
          </TouchableOpacity>
        </View>
        <View style={styles.leftCard}>
          <TouchableOpacity onPress={() => {
            this._clickMore();
            this.setState({
              leftPage: 4
            })
          }}>
            <Image source={require('./res/images/left-card-web.png')}/>
          </TouchableOpacity>
        </View>
        <View style={styles.leftCard}>
          <TouchableOpacity onPress={() => {
            this._clickMore();
            this.setState({
              leftPage: 5
            })
          }}>
            <Image source={require('./res/images/left-card-about.png')}/>
          </TouchableOpacity>
        </View>
      </View>
    }
    else if (this.state.page === 2) {
      pageView = <View>
        <Image style={styles.titleCity} source={require('./res/images/card-city.png')}/>
        <TextInput
          underlineColorAndroid='transparent'
          placeholder={"在這裡搜索"}
          placeholderTextColor={"#C0C0C0"}
          style={styles.textInputCity}
          onChangeText={(text) => {
            this.setState({cityText: text})
          }}/>
      </View>
    }
    if (this.state.leftPage === 1) {
      homeView = <View>
        <Image style={styles.weatherPicture}
               source={require('./res/images/sunny.png')}>
          <View style={styles.bar}>
            <TouchableOpacity onPress={() => {
              this._clickMore();
              this.setState({
                toggledOn: !toggledOn,
                page: 1
              })
            }}>
              <Image style={[styles.iconMore, toggledOn && styles.toggledOn]}
                     source={require('./res/images/icon-more.png')}
                     transition={['rotate']}
                     duration={500}/>
            </TouchableOpacity>
            <Text style={styles.title}>广州市</Text>
            <TouchableOpacity onPress={() => {
              this._clickLocation();
              this.setState({
                page: 2
              })
            }}>
              <Image style={styles.iconLocation}
                     source={require('./res/images/icon-location.png')}/>
            </TouchableOpacity>
          </View>
        </Image>

        <View style={styles.infoContainer}>
          <Text style={styles.weather}>晴</Text>
          <Text style={styles.temperature}>34℃</Text>
          <Text style={styles.info}>26-34℃ / 東南風 3 级</Text>
        </View>
      </View>
    } else if (this.state.leftPage === 2) {
      homeView = <View>
        <Image style={styles.pagePicture}
               source={require('./res/images/author-page.png')}>
          <View style={styles.bar}>
            <TouchableOpacity onPress={() => {
              this._clickMore();
              this.setState({
                toggledOn: !toggledOn,
                page: 1
              })
            }}>
              <Image style={[styles.iconMore, toggledOn && styles.toggledOn]}
                     source={require('./res/images/icon-more-black.png')}
                     transition={['rotate']}
                     duration={500}/>
            </TouchableOpacity>
            <Text style={styles.title_black_4}>作者介绍</Text>
            <TouchableOpacity onPress={() => {
              this._clickLocation();
              this.setState({
                page: 2
              })
            }}>
              <Image style={styles.iconLocation}
                     source={require('./res/images/icon-location-black.png')}/>
            </TouchableOpacity>
          </View>
        </Image>
      </View>
    } else if (this.state.leftPage === 3) {

    } else if (this.state.leftPage === 4) {

    } else if (this.state.leftPage === 5) {
      homeView = <View>
        <Image style={styles.pagePicture}
               source={require('./res/images/about-page.png')}>
          <View style={styles.bar}>
            <TouchableOpacity onPress={() => {
              this._clickMore();
              this.setState({
                toggledOn: !toggledOn,
                page: 1
              })
            }}>
              <Image style={[styles.iconMore, toggledOn && styles.toggledOn]}
                     source={require('./res/images/icon-more-black.png')}
                     transition={['rotate']}
                     duration={500}/>
            </TouchableOpacity>
            <Text style={styles.title_black_2}>关于</Text>
            <TouchableOpacity onPress={() => {
              this._clickLocation();
              this.setState({
                page: 2
              })
            }}>
              <Image style={styles.iconLocation}
                     source={require('./res/images/icon-location-black.png')}/>
            </TouchableOpacity>
          </View>
        </Image>
      </View>
    }

    return (
      <View ref='home' style={styles.container} onLayout={this._onLayoutDidChange}>
        <StatusBar
          backgroundColor='#ff0000'
          translucent={true}
          hidden={true}
          animated={true}
        />
        <Carousel
          style={this.state.size}
          autoplay={false}
          bullets
          onAnimateNextPage={(p) => {
            if (p === 1) {
              this._pushMorePage()
            }
          }}
          isLooped={false}
          bulletStyle={{backgroundColor: '#E9E9E9', width: 9, height: 9}}
          chosenBulletStyle={{backgroundColor: '#666666', width: 9, height: 9}}
        >
          <View style={this.state.size}>
            {pageView}
            <Animated.View
              style={[styles.content, {
                left: this.state.leftAnmValue,
                top: this.state.topAnmValue
              }, this.state.size]}>
              {homeView}
            </Animated.View>
          </View>
          <View style={[styles.container, this.state.size]}>
            <View ref='card1' style={styles.card1}>
              <Image style={styles.cardImage}
                     source={require('./res/images/card-sunny.png')}>
                <Text style={styles.date}>明天</Text>
                <Text style={styles.weatherInfo}>晴朗</Text>
                <Text style={styles.temperatureInfo}>26~35℃</Text>
              </Image>
            </View>
            <View ref='card2' style={styles.card2}>
              <Image style={styles.cardImage}
                     source={require('./res/images/card-rainy.png')}>
                <Text style={styles.date}>星期一</Text>
                <Text style={styles.weatherInfo}>中雨</Text>
                <Text style={styles.temperatureInfo}>24~31℃</Text>
              </Image>
            </View>
            <View ref='card3' style={styles.card3}>
              <Image style={styles.cardImage}
                     source={require('./res/images/card-cloudy.png')}>
                <Text style={styles.date}>星期二</Text>
                <Text style={styles.weatherInfo}>阴天</Text>
                <Text style={styles.temperatureInfo}>26~34℃</Text>
              </Image>
            </View>
          </View>
        </Carousel>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    flexDirection: 'column',
  },
  content: {
    position: 'absolute',
    backgroundColor: 'white',
    height: height,
    width: width,
    borderWidth: 0.1,
    borderRadius: 8,
    shadowColor: "#000000",
    shadowOffset: {width: 0, height: 4},
    shadowRadius: 8,
    shadowOpacity: 0.5,
  },
  bar: {
    flexDirection: 'row',
  },
  weatherPicture: {
    width: width,
    height: 330 / 667 * height
  },
  pagePicture: {
    width: width,
    height: height
  },
  iconMore: {
    position: 'absolute',
    width: 18 / 375 * width,
    height: 17 / 667 * height,
    left: 25 / 375 * width,
    top: 21 / 667 * height
  },
  toggledOn: {
    transform: [{
      rotate: '180deg',
    }]
  },
  title: {
    position: 'absolute',
    left: 162 / 375 * width,
    top: 18 / 667 * height,
    color: 'white',
    backgroundColor: "rgba(0,0,0,0)",
    fontSize: 17,
    fontFamily: 'SourceHanSerifCN'
  },
  title_black_2: {
    position: 'absolute',
    left: 170 / 375 * width,
    top: 18 / 667 * height,
    color: '#666',
    backgroundColor: "rgba(0,0,0,0)",
    fontSize: 17,
    fontFamily: 'SourceHanSerifCN'
  },
  title_black_4: {
    position: 'absolute',
    left: 152 / 375 * width,
    top: 18 / 667 * height,
    color: '#666',
    backgroundColor: "rgba(0,0,0,0)",
    fontSize: 17,
    fontFamily: 'SourceHanSerifCN'
  },
  iconLocation: {
    position: 'absolute',
    width: 16 / 375 * width,
    height: 22 / 667 * height,
    left: 328 / 375 * width,
    top: 21 / 667 * height
  },
  infoContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  weather: {
    marginTop: 84 / 667 * height,
    fontSize: 24,
    fontFamily: 'SourceHanSerifCN',
    color: '#363636'
  },
  temperature: {
    marginTop: 20 / 667 * height,
    fontSize: 20,
    fontFamily: 'SourceHanSerifCN',
    color: '#363636'
  },
  info: {
    marginTop: 77 / 667 * height,
    fontSize: 14,
    fontFamily: 'PingFang SC',
    fontWeight: '100',
    color: '#6E6E6E'
  },
  card1: {
    width: width,
    flexDirection: 'row',
    marginTop: 10 / 667 * height,
  },
  cardImage: {
    width: 292 / 375 * width,
    height: 124 / 667 * height,
    marginLeft: 58 / 375 * width
  },
  card2: {
    width: width,
    flexDirection: 'row',
    marginTop: 60 / 667 * height,
  },
  card3: {
    width: width,
    flexDirection: 'row',
    marginTop: 60 / 667 * height,
  },
  date: {
    marginTop: 9,
    fontSize: 20,
    fontFamily: 'SourceHanSerifCN',
    color: '#363636',
    backgroundColor: "rgba(0,0,0,0)"
  },
  weatherInfo: {
    marginTop: 24,
    fontSize: 14,
    color: '#363636',
    fontFamily: 'SourceHanSerifCN',
    backgroundColor: "rgba(0,0,0,0)",
  },
  temperatureInfo: {
    marginTop: 3,
    fontSize: 14,
    color: '#363636',
    fontFamily: 'SourceHanSerifCN',
    backgroundColor: "rgba(0,0,0,0)",
  },
  titleCity: {
    marginLeft: 25 / 375 * width,
    marginTop: 27 / 667 * height,
    width: 325 / 375 * width,
    height: 174 / 667 * height
  },
  textInputCity: {
    fontFamily: "PingFang SC",
    fontSize: 14,
    width: 325 / 375 * width,
    height: 36 / 667 * height,
    alignItems: "center",
    backgroundColor: "#F4F4F4",
    marginTop: 38 / 667 * height,
    marginLeft: 25 / 375 * width,
    paddingLeft: 17 / 375 * width,
    borderRadius: 20 / 375 * width,
  },
  leftCardTop: {
    width: 325 / 375 * width,
    flexDirection: 'row',
    marginTop: 37 / 667 * height,
    marginLeft: 25 / 375 * width,
  },
  leftCard: {
    width: 325 / 375 * width,
    flexDirection: 'row',
    marginTop: 14 / 667 * height,
    marginLeft: 25 / 375 * width,
  }
});

AppRegistry.registerComponent('fourtimes', () => fourtimes);
