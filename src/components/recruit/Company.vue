<template>
  <div class="back">
    <div class="index-container">
      <el-input placeholder="搜索公司" v-model="query.companyName" class="search-area input-with-select" clearable
                @clear="clearSearch">
        <el-button slot="append" class="searchBtn" @click="search">搜索</el-button>
      </el-input>

      <div class="search-condition">
        <el-button type="text" icon="el-icon-map-location" class="location" @click="chooseCityVisible = true">
          {{ location }} [选择城市]
        </el-button>
      </div>
      <div class="container">
        <el-card class="company-card box-card" v-for="item in companies" :key="item.id" :value="item.id">
          <div slot="header" class="clearfix">
            <span style="color: rgb(83,191,179);font-weight: bold;">{{ item.name }} [{{ item.city }}]</span>
            <span style="float: right;color: rgb(83,191,179);font-weight: bold;">{{ item.website }}</span>
          </div>
          <div>
            {{ item.desc }}
          </div>
          <div class="bottom clearfix">
            <el-button type="text" class="button" style="float: right;" @click="goInfo(item.account)">查看详情</el-button>
          </div>
        </el-card>
      </div>
      <el-dialog :title="'选择城市-> '+location" :visible.sync="chooseCityVisible" width="30%"
                 @close="chooseCityVisible = false">
        <div style="height: 300px;overflow:auto;">
          <div v-for="item in cities" :key="item.name">
            <span style="color: rgb(83,191,179);font-weight: bold;">{{ item.name }}</span><br/>
            <span v-for="(it,index) in item.cities" :key="it">
            <el-button type="text" style="margin-right: 10px;" @click="chooseCity(it)">
            {{ it }}
          </el-button>
          <br v-if="(index+1)/13 === 1"/>
        </span>
          </div>
        </div>
      </el-dialog>
    </div>
  </div>
</template>

<script>
export default {
  name: "Index",
  data() {
    return {
      location: '全国',
      query: {
        companyName: '',
        wheres: []
      },
      companies: [],
      chooseCityVisible: false,
      cities: [
        {
          name: '热门城市',
          cities: [
            '全国', '北京', '上海', '广州', '深圳', '杭州', '天津', '西安', '苏州', '武汉', '厦门', '长沙', '成都', '郑州', '重庆',
          ],
        },
        {
          name: 'A',
          cities: [
            '鞍山', '安康', '安阳', '安庆', '安顺', '澳门', '阿拉善盟', '阿里地区', '阿克苏', '阿勒泰', '阿拉尔',
          ],
        },
        {
          name: 'B',
          cities: [
            '北京', '白城', '白山', '本溪', '包头', '巴彦淖尔', '保定', '宝鸡', '滨州', '白银', '蚌埠', '亳州', '毕节', '巴中', '保山', '百色', '北海', '巴音郭楞蒙古自治州', '博尔塔拉蒙古自治州', '白沙黎族自治县', '保亭黎族苗族自治县', '北屯市',
          ],
        },
        {
          name: 'C',
          cities: [
            '重庆', '长春', '朝阳', '赤峰', '承德', '沧州', '长治', '常州', '滁州', '池州', '长沙', '郴州', '常德', '成都', '潮州', '崇左', '楚雄彝族自治州', '昌吉回族自治州', '澄迈', '昌江黎族自治县', '昌都',
          ],
        },
        {
          name: 'D',
          cities: [
            '大庆', '大连', '丹东', '大同', '德州', '东营', '定西', '达州', '德阳', '东莞', '德宏傣族景颇族自治州', '迪庆藏族自治州', '大理白族自治州', '大兴安岭', '儋州', '东方', '定安', '东沙群岛',
          ],
        },
        {
          name: 'E',
          cities: [
            '鄂尔多斯', '鄂州', '恩施土家族苗族自治州', '阿坝藏族羌族自治州',
          ],
        },
        {
          name: 'F',
          cities: [
            '抚顺', '阜新', '阜阳', '福州', '抚州', '佛山', '防城港',
          ],
        },
        {
          name: 'G',
          cities: [
            '固原', '赣州', '贵阳', '广安', '广元', '广州', '桂林', '贵港', '甘孜藏族自治州', '甘南藏族自治州', '果洛藏族自治州',
          ],
        },
        {
          name: 'H',
          cities: [
            '哈尔滨', '黑河', '鹤岗', '葫芦岛', '呼和浩特', '呼伦贝尔', '衡水', '邯郸', '汉中', '菏泽', '海东', '鹤壁', '淮安', '黄冈', '黄石', '杭州', '湖州', '合肥', '淮南', '淮北', '黄山', '衡阳', '怀化', '惠州', '河源', '贺州', '河池', '海口', '红河哈尼族彝族自治州', '海北藏族自治州', '黄南藏族自治州', '海南藏族自治州', '海西蒙古族藏族自治州', '哈密', '和田',
          ],
        },
        {
          name: 'J',
          cities: [
            '佳木斯', '鸡西', '吉林', '锦州', '晋中', '晋城', '济南', '济宁', '金昌', '酒泉', '嘉峪关', '焦作', '荆州', '荆门', '嘉兴', '金华', '九江', '吉安', '景德镇', '江门', '揭阳', '济源',
          ],
        },
        {
          name: 'K',
          cities: [
            '克拉玛依', '开封', '昆明', '克孜勒苏柯尔克孜自治州', '喀什', '可克达拉市', '昆玉市',
          ],
        },
        {
          name: 'L',
          cities: [
            '辽源', '辽阳', '廊坊', '临汾', '吕梁', '临沂', '聊城', '拉萨', '兰州', '陇南', '洛阳', '漯河', '连云港', '丽水', '六安', '龙岩', '娄底', '六盘水', '泸州', '乐山', '临沧', '丽江', '柳州', '来宾', '凉山彝族自治州', '临夏回族自治州', '临高', '乐东黎族自治县', '陵水黎族自治县', '林芝',
          ],
        },
        {
          name: 'M',
          cities: [
            '牡丹江', '马鞍山', '绵阳', '眉山', '梅州', '茂名',
          ],
        },
        {
          name: 'N',
          cities: [
            '南阳', '南京', '南通', '宁波', '宁德', '南平', '南昌', '南充', '内江', '南宁', '怒江傈僳族自治州', '那曲',
          ],
        },
        {
          name: 'P',
          cities: [
            '盘锦', '平凉', '平顶山', '濮阳', '莆田', '萍乡', '攀枝花', '普洱',
          ],
        },
        {
          name: 'Q',
          cities: [
            '齐齐哈尔', '七台河', '秦皇岛', '青岛', '庆阳', '衢州', '泉州', '清远', '曲靖', '钦州', '黔东南苗族侗族自治州', '黔南布依族苗族自治州', '黔西南布依族苗族自治州', '潜江', '琼海', '琼中黎族苗族自治县',
          ],
        },
        {
          name: 'R',
          cities: [
            '日照', '日喀则',
          ],
        },
        {
          name: 'S',
          cities: [
            '上海', '绥化', '双鸭山', '四平', '松原', '沈阳', '石家庄', '朔州', '商洛', '石嘴山', '商丘', '三门峡', '苏州', '宿迁', '十堰', '随州', '绍兴', '宿州', '三明', '上饶', '邵阳', '遂宁', '韶关', '汕头', '深圳', '汕尾', '三亚', '三沙', '神农架', '山南', '石河子', '双河市',
          ],
        },
        {
          name: 'T',
          cities: [
            '天津', '通化', '铁岭', '通辽', '唐山', '太原', '铜川', '泰安', '天水', '泰州', '台州', '铜陵', '铜仁', '天门', '屯昌', '吐鲁番', '塔城', '图木舒克', '铁门关', '台湾',
          ],
        },
        {
          name: 'W',
          cities: [
            '乌海', '乌兰察布', '渭南', '潍坊', '威海', '乌鲁木齐', '武威', '吴忠', '无锡', '武汉', '温州', '芜湖', '梧州', '文山壮族苗族自治州', '五指山', '文昌', '万宁', '五家渠',
          ],
        },
        {
          name: 'X',
          cities: [
            '邢台', '忻州', '西安', '咸阳', '西宁', '新乡', '许昌', '信阳', '徐州', '襄阳', '孝感', '咸宁', '宣城', '厦门', '新余', '湘潭', '香港', '湘西土家族苗族自治州', '西双版纳傣族自治州', '仙桃', '锡林郭勒盟', '兴安盟',
          ],
        },
        {
          name: 'Y',
          cities: [
            '伊春', '营口', '阳泉', '运城', '延安', '榆林', '烟台', '银川', '扬州', '盐城', '宜昌', '宜春', '鹰潭', '益阳', '岳阳', '永州', '宜宾', '雅安', '云浮', '阳江', '玉溪', '玉林', '延边朝鲜族自治州', '玉树藏族自治州', '伊犁哈萨克自治州',
          ],
        },
        {
          name: 'Z',
          cities: [
            '张家口', '淄博', '枣庄', '张掖', '中卫', '郑州', '周口', '驻马店', '镇江', '舟山', '漳州', '株洲', '张家界', '遵义', '自贡', '资阳', '珠海', '肇庆', '湛江', '中山', '昭通',
          ]
        },
      ]
    }
  },
  created() {
    this.findAllCompany()
  },
  methods: {
    async findAllCompany() {
      if (this.query.companyName !== '') {
        let companyNameIndex = -1;
        for (let i = 0; i < this.query.wheres.length; i++) {
          if (this.query.wheres[i].key === 'name') {
            companyNameIndex = i
          }
        }
        if (companyNameIndex >= 0) {
          this.query.wheres.splice(companyNameIndex, 1)
        }
        this.query.wheres.push({
          key: 'name',
          opt: 'like',
          value: '%' + this.query.companyName + '%',
          next: null
        })
      }
      for (let i = 0; i < this.query.wheres.length - 1; i++) {
        this.query.wheres[i].next = 'and'
      }
      if (this.query.wheres[this.query.wheres.length - 1] != null) {
        this.query.wheres[this.query.wheres.length - 1].next = null
      }
      const {data: res} = await this.$http.post('recruit/findCompany', this.query)
      if (res.code !== 201) return this.$message.error(res.msg)
      this.companies = res.data.companies
    },
    chooseCity(city) {
      this.location = city
      let cityIndex = -1;
      for (let i = 0; i < this.query.wheres.length; i++) {
        if (this.query.wheres[i].key === 'city') {
          cityIndex = i
        }
      }
      if (cityIndex >= 0) {
        this.query.wheres.splice(cityIndex, 1)
      }

      if (city !== '全国') {
        this.query.wheres.push({
          key: 'city',
          opt: '=',
          value: city,
          next: 'and'
        })
      }
      this.chooseCityVisible = false
      this.findAllCompany()
    },
    clearSearch() {
      let companyNameIndex = -1;
      for (let i = 0; i < this.query.wheres.length; i++) {
        if (this.query.wheres[i].key === 'name') {
          companyNameIndex = i
        }
      }
      if (companyNameIndex >= 0) {
        this.query.wheres.splice(companyNameIndex, 1)
      }
      this.findAllCompany()
    },
    search() {
      this.findAllCompany()
    },
    async goInfo(account) {
      await this.$router.push({name: 'companyInfo', params: {account: account}})
    }
  }
}
</script>

<style scoped lang="less">
.back {
  background-color: rgb(246, 246, 248);
  height: 100%;
  width: 100%;
}

.index-container {
  width: 40%;
  margin-top: 1%;
  margin-left: 30%;
  margin-bottom: 2%;

  .search-area {
    width: 90%;
    margin-left: 5%;
  }


  .searchBtn {
    background-color: rgb(93, 213, 200);
    color: white;
    width: 150px;
  }

}

.search-condition {
  width: 80%;
  margin-left: 10%;
}

.container {
  height: 100%;
  width: 100%;
  margin-top: 1%;

  .company-card {
    margin-bottom: 1%;
  }
}
</style>
