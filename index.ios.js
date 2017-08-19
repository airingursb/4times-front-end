import React, {Component} from 'react';
import {
  AppRegistry,
  StyleSheet,
  Animated,
  TouchableOpacity,
  WebView,
  Dimensions,
  StatusBar,
  Easing,
  TextInput,
  AsyncStorage,
  AlertIOS
} from 'react-native';
import Carousel from './src/components/Carousel';
import HttpUtil from './src/common/HttpUtil';
import {Image, Text, View} from 'react-native-animatable';

const {width, height} = Dimensions.get('window');
const HOST_GPS = 'https://ali-weather.showapi.com/gps-to-weather';
const HOST_POSITION = 'https://ali-weather.showapi.com/area-to-weather';
const HOST_FEEDBACK = 'https://mie-mie.tech';

export default class fourtimes extends Component {
  constructor(props) {
    super(props);
    this.state = {
      leftAnmValue: new Animated.Value(0),
      topAnmValue: new Animated.Value(0),
      size: {width, height},
      toggledOn: false,
      locationOn: false,
      page: 0,
      pageNumber: 0,
      leftPage: 1,
      cityText: '',
      FeedBackContent: '',
      FeedBackConnect: '',
      longitude: 0,
      latitude: 0,
      city1: '',
      city2: '',
      city3: '',
      citys: '',
      city: '北京市',
      now: {
        weather: '晴',
        temperature: '29',
        wind_direction: '東南風',
        wind_power: '3级'
      },
      f1: {},
      f2: {},
      f3: {},
      f4: {},
      getPosition: false
    }
  }

  componentWillMount() {

    AsyncStorage.getItem('citys', (error, result) => {
      if (!error) {
        if (result !== '' && result !== null) {
          this.state.citys = result
        }
      }
    });

    navigator.geolocation.watchPosition(
      (position) => {
        if (!this.state.getPosition) {
          this.setState({
            getPosition: true
          });
          let longitude = JSON.stringify(position.coords.longitude);
          let latitude = JSON.stringify(position.coords.latitude);
          console.log(longitude + ' ' + latitude);
          this.setState({
            longitude: longitude,
            latitude: latitude
          });
          HttpUtil.get(HOST_GPS + '?from=1&lat=' + latitude + '&lng=' + longitude + '&need3HourForcast=0&needAlarm=0&needHourData=0&needIndex=0&needMoreDay=1')
            .then(res => {
              if (res.showapi_res_body.ret_code === 0) {
                console.log(res);
                this.setState({
                  city: res.showapi_res_body.cityInfo.c5 + '市',
                  now: res.showapi_res_body.now,
                  f1: res.showapi_res_body.f1,
                  f2: res.showapi_res_body.f2,
                  f3: res.showapi_res_body.f3,
                  f4: res.showapi_res_body.f4,
                  getPosition: false
                });
              } else {
                this.setState({
                  city: '广州市',
                  now: {
                    weather_code: '01',
                    temperature: '23',
                    wind_direction: '东南风',
                    wind_power: '2级',
                    weather: '多云'
                  },
                  f1: {
                    night_air_temperature: '15',
                    day_air_temperature: '25',
                    day_weather_code: '00',
                    day_weather: '晴',
                    weekday: 4
                  },
                  f2: {
                    night_air_temperature: '16',
                    day_air_temperature: '27',
                    day_weather_code: '00',
                    day_weather: '晴',
                    weekday: 5
                  },
                  f3: {
                    night_air_temperature: '13',
                    day_air_temperature: '25',
                    day_weather_code: '01',
                    day_weather: '多云',
                    weekday: 6
                  },
                  f4: {
                    night_air_temperature: '15',
                    day_air_temperature: '24',
                    day_weather_code: '03',
                    day_weather: '小雨',
                    weekday: 7
                  }
                });
                AlertIOS.alert('Sorry! 无法自动定位到您所在的城市，请手动定位。')
              }
            })
            .catch(err => {
              this.setState({
                city: '广州市',
                now: {
                  weather_code: '01',
                  temperature: '23',
                  wind_direction: '东南风',
                  wind_power: '2级',
                  weather: '多云'
                },
                f1: {
                  night_air_temperature: '15',
                  day_air_temperature: '25',
                  day_weather_code: '00',
                  day_weather: '晴',
                  weekday: 4
                },
                f2: {
                  night_air_temperature: '16',
                  day_air_temperature: '27',
                  day_weather_code: '00',
                  day_weather: '晴',
                  weekday: 5
                },
                f3: {
                  night_air_temperature: '13',
                  day_air_temperature: '25',
                  day_weather_code: '01',
                  day_weather: '多云',
                  weekday: 6
                },
                f4: {
                  night_air_temperature: '15',
                  day_air_temperature: '24',
                  day_weather_code: '03',
                  day_weather: '小雨',
                  weekday: 7
                }
              });
              AlertIOS.alert('Sorry! 无法自动定位到您所在的城市，请手动定位。')
            });
        }
      },
      (error) => {
        console.log(error);
      },
      {enableHighAccuracy: true, timeout: 5000, maximumAge: 1000}
    );

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
      toValue: -300 / 375 * width,
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
    const {toggledOn} = this.state;

    if (this.state.pageNumber === 0) {
      _leftAnmValueHandler_1.start && _leftAnmValueHandler_1.start();
      _topAnmValueHandler_1.start && _topAnmValueHandler_1.start();
      this.setState({pageNumber: 1, toggledOn: !toggledOn})
    }
    else if (this.state.pageNumber === 1) {
      _leftAnmValueHandler_0.start && _leftAnmValueHandler_0.start();
      _topAnmValueHandler_0.start && _topAnmValueHandler_0.start();
      this.setState({pageNumber: 0, toggledOn: !toggledOn})
    }
  }

  _clickLocation() {
    const {locationOn} = this.state;
    if (this.state.pageNumber === 0) {
      _leftAnmValueHandler_2.start && _leftAnmValueHandler_2.start();
      _topAnmValueHandler_2.start && _topAnmValueHandler_2.start();
      this.setState({pageNumber: 2, locationOn: !locationOn})
    }
    else if (this.state.pageNumber === 2) {
      _leftAnmValueHandler_0.start && _leftAnmValueHandler_0.start();
      _topAnmValueHandler_0.start && _topAnmValueHandler_0.start();
      this.setState({pageNumber: 0, locationOn: !locationOn})
    }
  }

  _onLayoutDidChange = (e) => {
    const layout = e.nativeEvent.layout;
    this.setState({size: {width: layout.width, height: layout.height}});
  };

  _pushMorePage() {
    // this.refs.card1.transitionTo({opacity: 0.2});
  }

  _toWeekday(d) {
    switch (d) {
      case 1:
        return '一';
      case 2:
        return '二';
      case 3:
        return '三';
      case 4:
        return '四';
      case 5:
        return '五';
      case 6:
        return '六';
      case 7:
        return '日';
    }
  }

  render() {
    const {toggledOn, locationOn} = this.state;
    let pageView;
    let homeView;
    let f2CardView;
    let f3CardView;
    let f4CardView;

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
          returnKeyType='done'
          onSubmitEditing={() => {
            HttpUtil.get(HOST_POSITION + '?area=' + this.state.cityText + '&need3HourForcast=0&needAlarm=0&needHourData=0&needIndex=0&needMoreDay=1')
              .then(res => {
                console.log(res);
                if (res.showapi_res_body.ret_code === 0) {
                  this.state.city = res.showapi_res_body.cityInfo.c5 + '市';
                  this.state.now = res.showapi_res_body.now;
                  this.state.f1 = res.showapi_res_body.f1;
                  this.state.f2 = res.showapi_res_body.f2;
                  this.state.f3 = res.showapi_res_body.f3;
                  this.state.f4 = res.showapi_res_body.f4;
                  this.state.citys = this.state.citys + this.state.city + ',';
                  AsyncStorage.setItem('citys', this.state.citys);
                  this._clickLocation()
                } else {
                  AlertIOS.alert('查询不到该城市！')
                }
              })
              .catch(err => {
                AlertIOS.alert('查询不到该城市！')
              })
          }}
          onChangeText={(text) => {
            this.setState({cityText: text})
          }}/>
        <View style={styles.cityContainer}>
          <Text style={styles.alwaysCity}>常用城市</Text>
          <TouchableOpacity onPress={() => {
            HttpUtil.get(HOST_POSITION + '?area=' + this.state.citys.substr(0, this.state.citys.length - 1).split(',')[this.state.citys.substr(0, this.state.citys.length - 1).split(',').length - 1] + '&need3HourForcast=0&needAlarm=0&needHourData=0&needIndex=0&needMoreDay=1')
              .then(res => {
                console.log(res);
                if (res.showapi_res_body.ret_code === 0) {
                  this.state.city = res.showapi_res_body.cityInfo.c5 + '市';
                  this.state.now = res.showapi_res_body.now;
                  this.state.f1 = res.showapi_res_body.f1;
                  this.state.f2 = res.showapi_res_body.f2;
                  this.state.f3 = res.showapi_res_body.f3;
                  this.state.f4 = res.showapi_res_body.f4;
                  this.state.citys = this.state.citys + this.state.city + ',';
                  AsyncStorage.setItem('citys', this.state.citys);
                  this._clickLocation()
                } else {
                  AlertIOS.alert('查询不到该城市！')
                }
              })
              .catch(err => {
                AlertIOS.alert('查询不到该城市！')
              })
          }}>
            <Text
              style={styles.alwaysCityContent}>{this.state.citys.substr(0, this.state.citys.length - 1).split(',')[this.state.citys.substr(0, this.state.citys.length - 1).split(',').length - 1]}</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => {
            HttpUtil.get(HOST_POSITION + '?area=' + this.state.citys.substr(0, this.state.citys.length - 1).split(',')[this.state.citys.substr(0, this.state.citys.length - 1).split(',').length - 2] + '&need3HourForcast=0&needAlarm=0&needHourData=0&needIndex=0&needMoreDay=1')
              .then(res => {
                console.log(res);
                if (res.showapi_res_body.ret_code === 0) {
                  this.state.city = res.showapi_res_body.cityInfo.c5 + '市';
                  this.state.now = res.showapi_res_body.now;
                  this.state.f1 = res.showapi_res_body.f1;
                  this.state.f2 = res.showapi_res_body.f2;
                  this.state.f3 = res.showapi_res_body.f3;
                  this.state.f4 = res.showapi_res_body.f4;
                  this.state.citys = this.state.citys + this.state.city + ',';
                  AsyncStorage.setItem('citys', this.state.citys);
                  this._clickLocation()
                } else {
                  AlertIOS.alert('查询不到该城市！')
                }
              })
              .catch(err => {
                AlertIOS.alert('查询不到该城市！')
              })
          }}>
            <Text
              style={styles.alwaysCityContent}>{this.state.citys.substr(0, this.state.citys.length - 1).split(',')[this.state.citys.substr(0, this.state.citys.length - 1).split(',').length - 2]}</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => {
            HttpUtil.get(HOST_POSITION + '?area=' + this.state.citys.substr(0, this.state.citys.length - 1).split(',')[this.state.citys.substr(0, this.state.citys.length - 1).split(',').length - 3] + '&need3HourForcast=0&needAlarm=0&needHourData=0&needIndex=0&needMoreDay=1')
              .then(res => {
                console.log(res);
                if (res.showapi_res_code === 0) {
                  this.state.city = res.showapi_res_body.cityInfo.c5 + '市';
                  this.state.now = res.showapi_res_body.now;
                  this.state.f1 = res.showapi_res_body.f1;
                  this.state.f2 = res.showapi_res_body.f2;
                  this.state.f3 = res.showapi_res_body.f3;
                  this.state.f4 = res.showapi_res_body.f4;
                  this.state.citys = this.state.citys + this.state.city + ',';
                  AsyncStorage.setItem('citys', this.state.citys);
                  this._clickLocation()
                } else {
                  AlertIOS.alert('查询不到该城市！')
                }
              })
              .catch(err => {
                AlertIOS.alert('查询不到该城市！')
              })
          }}>
            <Text
              style={styles.alwaysCityContent}>{this.state.citys.substr(0, this.state.citys.length - 1).split(',')[this.state.citys.substr(0, this.state.citys.length - 1).split(',').length - 3]}</Text>
          </TouchableOpacity>
        </View>
      </View>
    }
    if (this.state.leftPage === 1) {
      homeView = <View>
        <TouchableOpacity
          disabled={!toggledOn && !locationOn}
          onPress={() => {
            if (toggledOn && !locationOn) {
              this._clickMore();
              this.setState({
                page: 1
              })
            } else if (!toggledOn && locationOn) {
              this._clickLocation();
              this.setState({
                page: 2
              })
            }
          }}>
          <Image style={styles.weatherPicture}
                 source={{uri: 'https://airing.ursb.me/image/4times/weather_' + this.state.now.weather_code + '@3x.png-yasuo100.jpg'}}>
            <View style={styles.bar}>
              <TouchableOpacity
                disabled={toggledOn}
                onPress={() => {
                  if (!toggledOn && !locationOn) {
                    this._clickMore();
                    this.setState({
                      page: 1
                    })
                  }
                }}>
                <Image
                  style={[styles.iconMore, toggledOn && styles.toggledOn]}
                  source={this.state.now.weather_code === '01' ? require('./res/images/icon-more-black.png') : require('./res/images/icon-more.png')}
                  transition={['rotate']}
                  duration={500}/>
              </TouchableOpacity>
              <Text
                style={this.state.now.weather_code === '01' ? styles.title_black : styles.title}>{this.state.city}</Text>
              <TouchableOpacity
                disabled={locationOn}
                onPress={() => {
                  if (!toggledOn && !locationOn) {
                    this._clickLocation();
                    this.setState({
                      page: 2
                    })
                  }
                }}>
                <Image style={styles.iconLocation}
                       source={this.state.now.weather_code === '01' ? require('./res/images/icon-location-black.png') : require('./res/images/icon-location.png')}/>
              </TouchableOpacity>
            </View>
          </Image>
          <View style={styles.infoContainer}>
            <Text style={styles.weather}>{this.state.now.weather}</Text>
            <Text style={styles.temperature}>{this.state.now.temperature}℃</Text>
            <Text style={styles.info}>{this.state.f1.night_air_temperature}-{this.state.f1.day_air_temperature}℃
              / {this.state.now.wind_direction} {this.state.now.wind_power.replace('级', '')} 级</Text>
          </View>
        </TouchableOpacity>
      </View>
    } else if (this.state.leftPage === 2) {
      homeView = <View>
        <TouchableOpacity
          disabled={!toggledOn && !locationOn}
          onPress={() => {
            if (toggledOn && !locationOn) {
              this._clickMore();
              this.setState({
                page: 1
              })
            } else if (!toggledOn && locationOn) {
              this._clickLocation();
              this.setState({
                page: 2
              })
            }
          }}>
          <Image style={styles.pagePicture}
                 source={require('./res/images/author-page.png')}>
            <View style={styles.bar}>
              <TouchableOpacity
                disabled={toggledOn}
                onPress={() => {
                  if (!toggledOn && !locationOn) {
                    this._clickMore();
                    this.setState({
                      page: 1
                    })
                  }
                }}>
                <Image style={[styles.iconMore, toggledOn && styles.toggledOn]}
                       source={require('./res/images/icon-more-black.png')}
                       transition={['rotate']}
                       duration={500}/>
              </TouchableOpacity>
              <Text style={styles.title_black_4}>作者介绍</Text>
              <TouchableOpacity
                disabled={locationOn}
                onPress={() => {
                  if (!toggledOn && !locationOn) {
                    this._clickLocation();
                    this.setState({
                      page: 2
                    })
                  }
                }}>
                <Image style={styles.iconLocation}
                       source={require('./res/images/icon-location-black.png')}/>
              </TouchableOpacity>
            </View>
          </Image>
        </TouchableOpacity>
      </View>
    } else if (this.state.leftPage === 3) {
      homeView = <View>
        <TouchableOpacity
          disabled={!toggledOn && !locationOn}
          onPress={() => {
            if (toggledOn && !locationOn) {
              this._clickMore();
              this.setState({
                page: 1
              })
            } else if (!toggledOn && locationOn) {
              this._clickLocation();
              this.setState({
                page: 2
              })
            }
          }}>
          <View style={styles.bar}>
            <TouchableOpacity
              disabled={toggledOn}
              onPress={() => {
                if (!toggledOn && !locationOn) {
                  this._clickMore();
                  this.setState({
                    page: 1
                  })
                }
              }}>
              <Image style={[styles.iconMore, toggledOn && styles.toggledOn]}
                     source={require('./res/images/icon-more-black.png')}
                     transition={['rotate']}
                     duration={500}/>
            </TouchableOpacity>
            <Text style={styles.title_black_2}>反馈</Text>
            <TouchableOpacity
              disabled={locationOn}
              onPress={() => {
                if (!toggledOn && !locationOn) {
                  this._clickLocation();
                  this.setState({
                    page: 2
                  })
                }
              }}>
              <Image style={styles.iconLocation}
                     source={require('./res/images/icon-location-black.png')}/>
            </TouchableOpacity>
          </View>
          <Image style={styles.iconFeedback}
                 source={require('./res/images/icon-feedback.png')}/>
          <TextInput
            underlineColorAndroid='transparent'
            placeholder={"这里输入您的意见~"}
            placeholderTextColor={"#C0C0C0"}
            style={styles.textInputContent}
            multiline={true}
            onChangeText={(text) => {
              this.setState({FeedBackContent: text})
            }}/>
          <TextInput
            underlineColorAndroid='transparent'
            placeholder={"记得留下您的联系方式哦~"}
            placeholderTextColor={"#C0C0C0"}
            style={styles.textInputConnect}
            onChangeText={(text) => {
              this.setState({FeedBackConnect: text})
            }}/>
          <TouchableOpacity onPress={() => {
            HttpUtil.post(HOST_FEEDBACK + '/users/feedback', {
              token: 'token',
              content: this.state.FeedBackContent,
              contact: this.state.FeedBackConnect,
              uid: 2,
              timestamp: new Date().getTime()
            }).then((res) => {
              console.log(res);
              if (res.status === 0) {
                AlertIOS.alert('感谢您的反馈~我会及时回复的！！QwQ')
              }
            })
          }}>
            <Image style={styles.iconSend}
                   source={require('./res/images/icon-sent.png')}/>
          </TouchableOpacity>
        </TouchableOpacity>
      </View>
    } else if (this.state.leftPage === 4) {
      homeView = <View>
        <TouchableOpacity
          disabled={!toggledOn && !locationOn}
          onPress={() => {
            if (toggledOn && !locationOn) {
              this._clickMore();
              this.setState({
                page: 1
              })
            } else if (!toggledOn && locationOn) {
              this._clickLocation();
              this.setState({
                page: 2
              })
            }
          }}>
          <View style={styles.bar}>
            <TouchableOpacity
              disabled={toggledOn}
              onPress={() => {
                if (!toggledOn && !locationOn) {
                  this._clickMore();
                  this.setState({
                    page: 1
                  })
                }
              }}>
              <Image style={[styles.iconMore, toggledOn && styles.toggledOn]}
                     source={require('./res/images/icon-more-black.png')}
                     transition={['rotate']}
                     duration={500}/>
            </TouchableOpacity>
            <Text style={styles.title_black_4}>产品主页</Text>
            <TouchableOpacity
              disabled={locationOn}
              onPress={() => {
                if (!toggledOn && !locationOn) {
                  this._clickLocation();
                  this.setState({
                    page: 2
                  })
                }
              }}>
              <Image style={styles.iconLocation}
                     source={require('./res/images/icon-location-black.png')}/>
            </TouchableOpacity>
            <WebView
              style={styles.webView}
              source={{uri: 'https://oh-bear.github.io'}}
              bounces={true}
              scalesPageToFit={true}
              startInLoadingState={true}
              javaScriptEnabled={true}
              domStorageEnabled={true}
            />
          </View>
        </TouchableOpacity>
      </View>
    } else if (this.state.leftPage === 5) {
      homeView = <View>
        <TouchableOpacity
          disabled={!toggledOn && !locationOn}
          onPress={() => {
            if (toggledOn && !locationOn) {
              this._clickMore();
              this.setState({
                page: 1
              })
            } else if (!toggledOn && locationOn) {
              this._clickLocation();
              this.setState({
                page: 2
              })
            }
          }}>
          <Image style={styles.pagePicture}
                 source={require('./res/images/about-page.png')}>
            <View style={styles.bar}>
              <TouchableOpacity
                disabled={toggledOn}
                onPress={() => {
                  if (!toggledOn && !locationOn) {
                    this._clickMore();
                    this.setState({
                      page: 1
                    })
                  }
                }}>
                <Image style={[styles.iconMore, toggledOn && styles.toggledOn]}
                       source={require('./res/images/icon-more-black.png')}
                       transition={['rotate']}
                       duration={500}/>
              </TouchableOpacity>
              <Text style={styles.title_black_2}>关于</Text>
              <TouchableOpacity
                disabled={locationOn}
                onPress={() => {
                  if (!toggledOn && !locationOn) {
                    this._clickLocation();
                    this.setState({
                      page: 2
                    })
                  }
                }}>
                <Image style={styles.iconLocation}
                       source={require('./res/images/icon-location-black.png')}/>
              </TouchableOpacity>
            </View>
          </Image>
        </TouchableOpacity>
      </View>
    }

    if (this.state.f2.day_weather_code === '00') {
      f2CardView = <View ref='card1' style={styles.card1}>
        <Image style={styles.cardImage}
               source={require('./res/images/card-sunny.png')}>
          <Text style={styles.date}>明天</Text>
          <Text style={styles.weatherInfo}>{this.state.f2.day_weather}</Text>
          <Text style={styles.temperatureInfo}>{this.state.f2.night_air_temperature}~{this.state.f2.day_air_temperature}℃</Text>
        </Image>
      </View>
    } else if (this.state.f2.day_weather_code === '01') {
      f2CardView = <View ref='card1' style={styles.card1}>
        <Image style={styles.cardImage}
               source={require('./res/images/card-cloudy01.png')}>
          <Text style={styles.date}>明天</Text>
          <Text style={styles.weatherInfo}>{this.state.f2.day_weather}</Text>
          <Text style={styles.temperatureInfo}>{this.state.f2.night_air_temperature}~{this.state.f2.day_air_temperature}℃</Text>
        </Image>
      </View>
    } else if (this.state.f2.day_weather_code === '02' || this.state.f2.day_weather_code === '18') {
      f2CardView = <View ref='card1' style={styles.card1}>
        <Image style={styles.cardImage}
               source={require('./res/images/card-cloudy.png')}>
          <Text style={styles.date}>明天</Text>
          <Text style={styles.weatherInfo}>{this.state.f2.day_weather}</Text>
          <Text style={styles.temperatureInfo}>{this.state.f2.night_air_temperature}~{this.state.f2.day_air_temperature}℃</Text>
        </Image>
      </View>
    } else if (this.state.f2.day_weather_code === '03' || this.state.f2.day_weather_code === '04' || this.state.f2.day_weather_code === '05' || this.state.f2.day_weather_code === '06' || this.state.f2.day_weather_code === '07' || this.state.f2.day_weather_code === '08' || this.state.f2.day_weather_code === '09' || this.state.f2.day_weather_code === '10' || this.state.f2.day_weather_code === '11' || this.state.f2.day_weather_code === '12' || this.state.f2.day_weather_code === '21' || this.state.f2.day_weather_code === '22' || this.state.f2.day_weather_code === '23' || this.state.f2.day_weather_code === '24' || this.state.f2.day_weather_code === '25' || this.state.f2.day_weather_code === '19' || this.state.f2.day_weather_code === '301') {
      f2CardView = <View ref='card1' style={styles.card1}>
        <Image style={styles.cardImage}
               source={require('./res/images/card-rainy.png')}>
          <Text style={styles.date}>明天</Text>
          <Text style={styles.weatherInfo}>{this.state.f2.day_weather}</Text>
          <Text style={styles.temperatureInfo}>{this.state.f2.night_air_temperature}~{this.state.f2.day_air_temperature}℃</Text>
        </Image>
      </View>
    } else if (this.state.f2.day_weather_code === '13' || this.state.f2.day_weather_code === '14' || this.state.f2.day_weather_code === '15' || this.state.f2.day_weather_code === '16' || this.state.f2.day_weather_code === '17' || this.state.f2.day_weather_code === '26' || this.state.f2.day_weather_code === '27' || this.state.f2.day_weather_code === '28' || this.state.f2.day_weather_code === '302') {
      f2CardView = <View ref='card1' style={styles.card1}>
        <Image style={styles.cardImage}
               source={require('./res/images/card-snowy.png')}>
          <Text style={styles.date}>明天</Text>
          <Text style={styles.weatherInfo}>{this.state.f2.day_weather}</Text>
          <Text style={styles.temperatureInfo}>{this.state.f2.night_air_temperature}~{this.state.f2.day_air_temperature}℃</Text>
        </Image>
      </View>
    } else if (this.state.f2.day_weather_code === '20' || this.state.f2.day_weather_code === '29' || this.state.f2.day_weather_code === '30' || this.state.f2.day_weather_code === '31' || this.state.f2.day_weather_code === '53') {
      f2CardView = <View ref='card1' style={styles.card1}>
        <Image style={styles.cardImage}
               source={require('./res/images/card-rainy.png')}>
          <Text style={styles.date}>明天</Text>
          <Text style={styles.weatherInfo}>{this.state.f2.day_weather}</Text>
          <Text style={styles.temperatureInfo}>{this.state.f2.night_air_temperature}~{this.state.f2.day_air_temperature}℃</Text>
        </Image>
      </View>
    }

    if (this.state.f3.day_weather_code === '00') {
      f3CardView = <View ref='card2' style={styles.card2}>
        <Image style={styles.cardImage}
               source={require('./res/images/card-sunny.png')}>
          <Text style={styles.date}>星期{this._toWeekday(this.state.f3.weekday)}</Text>
          <Text style={styles.weatherInfo}>{this.state.f3.day_weather}</Text>
          <Text style={styles.temperatureInfo}>{this.state.f3.night_air_temperature}~{this.state.f3.day_air_temperature}℃</Text>
        </Image>
      </View>
    } else if (this.state.f3.day_weather_code === '01') {
      f3CardView = <View ref='card2' style={styles.card2}>
        <Image style={styles.cardImage}
               source={require('./res/images/card-cloudy01.png')}>
          <Text style={styles.date}>星期{this._toWeekday(this.state.f3.weekday)}</Text>
          <Text style={styles.weatherInfo}>{this.state.f3.day_weather}</Text>
          <Text style={styles.temperatureInfo}>{this.state.f3.night_air_temperature}~{this.state.f3.day_air_temperature}℃</Text>
        </Image>
      </View>
    } else if (this.state.f3.day_weather_code === '02' || this.state.f3.day_weather_code === '18') {
      f3CardView = <View ref='card2' style={styles.card2}>
        <Image style={styles.cardImage}
               source={require('./res/images/card-cloudy.png')}>
          <Text style={styles.date}>星期{this._toWeekday(this.state.f3.weekday)}</Text>
          <Text style={styles.weatherInfo}>{this.state.f3.day_weather}</Text>
          <Text style={styles.temperatureInfo}>{this.state.f3.night_air_temperature}~{this.state.f3.day_air_temperature}℃</Text>
        </Image>
      </View>
    } else if (this.state.f3.day_weather_code === '03' || this.state.f3.day_weather_code === '04' || this.state.f3.day_weather_code === '05' || this.state.f3.day_weather_code === '06' || this.state.f3.day_weather_code === '07' || this.state.f3.day_weather_code === '08' || this.state.f3.day_weather_code === '09' || this.state.f3.day_weather_code === '10' || this.state.f3.day_weather_code === '11' || this.state.f3.day_weather_code === '12' || this.state.f3.day_weather_code === '21' || this.state.f3.day_weather_code === '22' || this.state.f3.day_weather_code === '23' || this.state.f3.day_weather_code === '24' || this.state.f3.day_weather_code === '25' || this.state.f3.day_weather_code === '19' || this.state.f3.day_weather_code === '301') {
      f3CardView = <View ref='card2' style={styles.card2}>
        <Image style={styles.cardImage}
               source={require('./res/images/card-rainy.png')}>
          <Text style={styles.date}>星期{this._toWeekday(this.state.f3.weekday)}</Text>
          <Text style={styles.weatherInfo}>{this.state.f3.day_weather}</Text>
          <Text style={styles.temperatureInfo}>{this.state.f3.night_air_temperature}~{this.state.f3.day_air_temperature}℃</Text>
        </Image>
      </View>
    } else if (this.state.f3.day_weather_code === '13' || this.state.f3.day_weather_code === '14' || this.state.f3.day_weather_code === '15' || this.state.f3.day_weather_code === '16' || this.state.f3.day_weather_code === '17' || this.state.f3.day_weather_code === '26' || this.state.f3.day_weather_code === '27' || this.state.f3.day_weather_code === '28' || this.state.f3.day_weather_code === '302') {
      f3CardView = <View ref='card2' style={styles.card2}>
        <Image style={styles.cardImage}
               source={require('./res/images/card-snowy.png')}>
          <Text style={styles.date}>星期{this._toWeekday(this.state.f3.weekday)}</Text>
          <Text style={styles.weatherInfo}>{this.state.f3.day_weather}</Text>
          <Text style={styles.temperatureInfo}>{this.state.f3.night_air_temperature}~{this.state.f3.day_air_temperature}℃</Text>
        </Image>
      </View>
    } else if (this.state.f3.day_weather_code === '20' || this.state.f3.day_weather_code === '29' || this.state.f3.day_weather_code === '30' || this.state.f3.day_weather_code === '31' || this.state.f3.day_weather_code === '53') {
      f3CardView = <View ref='card2' style={styles.card2}>
        <Image style={styles.cardImage}
               source={require('./res/images/card-rainy.png')}>
          <Text style={styles.date}>星期{this._toWeekday(this.state.f3.weekday)}</Text>
          <Text style={styles.weatherInfo}>{this.state.f3.day_weather}</Text>
          <Text style={styles.temperatureInfo}>{this.state.f3.night_air_temperature}~{this.state.f3.day_air_temperature}℃</Text>
        </Image>
      </View>
    }

    if (this.state.f4.day_weather_code === '00') {
      f4CardView = <View ref='card3' style={styles.card3}>
        <Image style={styles.cardImage}
               source={require('./res/images/card-sunny.png')}>
          <Text style={styles.date}>星期{this._toWeekday(this.state.f4.weekday)}</Text>
          <Text style={styles.weatherInfo}>{this.state.f4.day_weather}</Text>
          <Text style={styles.temperatureInfo}>{this.state.f4.night_air_temperature}~{this.state.f4.day_air_temperature}℃</Text>
        </Image>
      </View>
    } else if (this.state.f4.day_weather_code === '01') {
      f4CardView = <View ref='card3' style={styles.card3}>
        <Image style={styles.cardImage}
               source={require('./res/images/card-cloudy01.png')}>
          <Text style={styles.date}>星期{this._toWeekday(this.state.f4.weekday)}</Text>
          <Text style={styles.weatherInfo}>{this.state.f4.day_weather}</Text>
          <Text style={styles.temperatureInfo}>{this.state.f4.night_air_temperature}~{this.state.f4.day_air_temperature}℃</Text>
        </Image>
      </View>
    } else if (this.state.f4.day_weather_code === '02' || this.state.f4.day_weather_code === '18') {
      f4CardView = <View ref='card3' style={styles.card3}>
        <Image style={styles.cardImage}
               source={require('./res/images/card-cloudy.png')}>
          <Text style={styles.date}>星期{this._toWeekday(this.state.f4.weekday)}</Text>
          <Text style={styles.weatherInfo}>{this.state.f4.day_weather}</Text>
          <Text style={styles.temperatureInfo}>{this.state.f4.night_air_temperature}~{this.state.f4.day_air_temperature}℃</Text>
        </Image>
      </View>
    } else if (this.state.f4.day_weather_code === '03' || this.state.f4.day_weather_code === '04' || this.state.f4.day_weather_code === '05' || this.state.f4.day_weather_code === '06' || this.state.f4.day_weather_code === '07' || this.state.f4.day_weather_code === '08' || this.state.f4.day_weather_code === '09' || this.state.f4.day_weather_code === '10' || this.state.f4.day_weather_code === '11' || this.state.f4.day_weather_code === '12' || this.state.f4.day_weather_code === '21' || this.state.f4.day_weather_code === '22' || this.state.f4.day_weather_code === '23' || this.state.f4.day_weather_code === '24' || this.state.f4.day_weather_code === '25' || this.state.f4.day_weather_code === '19' || this.state.f4.day_weather_code === '301') {
      f4CardView = <View ref='card3' style={styles.card3}>
        <Image style={styles.cardImage}
               source={require('./res/images/card-rainy.png')}>
          <Text style={styles.date}>星期{this._toWeekday(this.state.f4.weekday)}</Text>
          <Text style={styles.weatherInfo}>{this.state.f4.day_weather}</Text>
          <Text style={styles.temperatureInfo}>{this.state.f4.night_air_temperature}~{this.state.f4.day_air_temperature}℃</Text>
        </Image>
      </View>
    } else if (this.state.f4.day_weather_code === '13' || this.state.f4.day_weather_code === '14' || this.state.f4.day_weather_code === '15' || this.state.f4.day_weather_code === '16' || this.state.f4.day_weather_code === '17' || this.state.f4.day_weather_code === '26' || this.state.f4.day_weather_code === '27' || this.state.f4.day_weather_code === '28' || this.state.f4.day_weather_code === '302') {
      f4CardView = <View ref='card3' style={styles.card3}>
        <Image style={styles.cardImage}
               source={require('./res/images/card-snowy.png')}>
          <Text style={styles.date}>星期{this._toWeekday(this.state.f4.weekday)}</Text>
          <Text style={styles.weatherInfo}>{this.state.f4.day_weather}</Text>
          <Text style={styles.temperatureInfo}>{this.state.f4.night_air_temperature}~{this.state.f4.day_air_temperature}℃</Text>
        </Image>
      </View>
    } else if (this.state.f4.day_weather_code === '20' || this.state.f4.day_weather_code === '29' || this.state.f4.day_weather_code === '30' || this.state.f4.day_weather_code === '31' || this.state.f4.day_weather_code === '53') {
      f4CardView = <View ref='card3' style={styles.card3}>
        <Image style={styles.cardImage}
               source={require('./res/images/card-rainy.png')}>
          <Text style={styles.date}>星期{this._toWeekday(this.state.f4.weekday)}</Text>
          <Text style={styles.weatherInfo}>{this.state.f4.day_weather}</Text>
          <Text style={styles.temperatureInfo}>{this.state.f4.night_air_temperature}~{this.state.f4.day_air_temperature}℃</Text>
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
            {f2CardView}
            {f3CardView}
            {f4CardView}
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
    height: 330 / 667 * height,
    zIndex: 1
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
    top: 21 / 667 * height,
    zIndex: 999
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
    fontFamily: 'SourceHanSerifCN',
    zIndex: 999
  },
  title_black: {
    position: 'absolute',
    left: 162 / 375 * width,
    top: 18 / 667 * height,
    color: '#666',
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
    top: 21 / 667 * height,
    zIndex: 999
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
  textInputContent: {
    fontFamily: "PingFang SC",
    fontSize: 14,
    width: 325 / 375 * width,
    height: 106 / 667 * height,
    alignItems: "center",
    backgroundColor: "#F4F4F4",
    marginTop: 10 / 667 * height,
    marginLeft: 25 / 375 * width,
    paddingLeft: 16 / 375 * width,
    paddingTop: 16 / 375 * width,
    borderRadius: 5 / 375 * width,
  },
  textInputConnect: {
    fontFamily: "PingFang SC",
    fontSize: 14,
    lineHeight: 14,
    width: 325 / 375 * width,
    height: 48 / 667 * height,
    alignItems: "center",
    backgroundColor: "#F4F4F4",
    marginTop: 20 / 667 * height,
    marginLeft: 25 / 375 * width,
    paddingLeft: 16 / 375 * width,
    borderRadius: 5 / 375 * width,
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
  },
  iconFeedback: {
    marginTop: 65 / 667 * height,
    marginLeft: 152 / 375 * width,
    width: 72 / 375 * width,
    height: 72 / 667 * height
  },
  iconSend: {
    marginTop: 36 / 667 * height,
    marginLeft: 315 / 375 * width,
  },
  webView: {
    position: 'absolute',
    top: 50 / 667 * height,
    left: 0,
    width: width,
    height: 617 / 667 * height
  },
  cityContainer: {
    width: width,
    marginTop: 50 / 667 * height,
    marginLeft: 25 / 375 * width
  },
  alwaysCity: {
    color: '#b2b2b2',
    fontSize: 14
  },
  alwaysCityContent: {
    color: '#363636',
    fontSize: 24,
    lineHeight: 33 / 667 * height,
    marginTop: 11 / 667 * height
  }
});

AppRegistry.registerComponent('fourtimes', () => fourtimes);
