let Bower = require('./bower')let config = require('../config').weatherlet cityIdConfig = require('../config/city')class Weather{    constructor(){        this.bower = new Bower();    }    sayWeather(cityJson){        var innerCity = {            country: '',            province: '',            city: ''        }        if(typeof cityJson == 'object'){            innerCity.country = cityJson.country            innerCity.province = cityJson.province            innerCity.city = cityJson.city        }else{            innerCity.city = cityJson        }        if(innerCity.city){            console.log('自动定位成功，当前：'+innerCity.country+'-'+innerCity.province+'-'+innerCity.city)            let has = true            let cityId = ''            for(var i=0; i<cityIdConfig.length; i++){                var v = cityIdConfig[i]                if(v.indexOf(innerCity.city) != -1){                    if(has){                        cityId = v.split('=')[0]                        has = false                    }                }            }            if(cityId){                console.log('获取天气中....')                this.bower.openPage(                    config.url+cityId+config.data.concatStr,                    data=>{                        try{                            data = data.replace(/^weather_callback\(/,'').replace(/\)$/,'')                            data = JSON.parse(data)                            let innerData = data.weatherinfo                            console.log('(: 获取天气成功\n')                            console.log('+---------------+\n')                            console.log('今天'+innerData.img_title1+'\n')                            console.log('气温'+innerData.temp1+'\n')                            console.log(innerData.fl1+'\n')                            console.log(innerData.fl2+'\n')                            console.log('(: 天气预测\n')                            console.log('明天'+innerData.weather2+'\n')                            console.log('后天'+innerData.weather3+'\n')                            console.log('更新时间：'+data.update_time)                            console.log('+---------------+\n')                        }catch (e){                        }                    },                    err=>{                    }                )            }else{                console.log('未找到该城市天气....')            }        }else{            console.log('自动定位失败')        }    }    getWeather(cmdArguments){        if(cmdArguments.length == 1){            this.bower.openPage(                config.ipUrl,                data=>{                    let cityJson = JSON.parse(data)                    this.sayWeather(cityJson)                },                err=>{                    console.log(config.error, config.error)                }            )        }else{            this.sayWeather(cmdArguments[1])        }    }}module.exports = {    consoleWeather: function (cmdArguments) {        new Weather().getWeather(cmdArguments)    }}