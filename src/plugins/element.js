import Vue from 'vue'
import {
    Button,
    Tag,
    Message,
    Form,
    FormItem,
    Input,
    Select,
    Option,
    Row,
    Col,
    Radio,
    DatePicker,
    Divider,
    Menu,
    MenuItem,
    RadioGroup,
    Container,
    Header,
    Carousel,
    CarouselItem,
    Card,
    Dropdown,
    DropdownItem,
    DropdownMenu,
    Dialog,
    MessageBox,
    Aside,
    Submenu,
    Main,
    Breadcrumb,
    BreadcrumbItem,
    Table,
    TableColumn,
    Pagination
} from 'element-ui'

Vue.use(Button)
Vue.use(Tag)
Vue.use(Form)
Vue.use(FormItem)
Vue.use(Input)
Vue.use(Select)
Vue.use(Option)
Vue.use(Row)
Vue.use(Col)
Vue.use(Radio)
Vue.use(DatePicker)
Vue.use(Divider)
Vue.use(Menu)
Vue.use(MenuItem)
Vue.use(RadioGroup)
Vue.use(Container)
Vue.use(Header)
Vue.use(Carousel)
Vue.use(CarouselItem)
Vue.use(Card)
Vue.use(Dropdown)
Vue.use(DropdownMenu)
Vue.use(DropdownItem)
Vue.use(Dialog)
Vue.use(Aside)
Vue.use(Submenu)
Vue.use(Main)
Vue.use(Breadcrumb)
Vue.use(BreadcrumbItem)
Vue.use(Table)
Vue.use(TableColumn)
Vue.use(Pagination)

Vue.prototype.$message = Message
Vue.prototype.$confirm = MessageBox.confirm
