import moment from "moment"
import dictionary from "./dictionary"

export default (store) =>{
    let o = [
        {
            key: 'avatar',
            render(h, { row }) {
                // 这是JSX语法
                return h('div', { attrs: { 'data-id': row.id } }, [
                    h('LoadingGifImage', {
                        attrs: {
                            w: 90 * 1.2,
                            h: 60 * 1.2,
                            src: `http://192.168.1.88/images/carimages_small/${row.id}/view/${row.avatar}`
                        }
                    }, '')
                ])
            }
        },
        { key: 'id', sortable: 'custom', width: 85 },
        { key: 'brand', width:70 },
        { key: 'series', width: 80 },
        { key: 'color', width: 55 },
        { key: 'price', sortable: 'custom' },
        { key: 'gearbox', width: 60 },
        { key: 'engine', width: 60},
        { key: 'exhaust', width: 60},
        { key: 'km', sortable: 'custom' },
        { 
            title: '购买时间', key: 'buydate',
            render(h, {row}){
                return h('div', {}, moment(row.buydate).format('YYYY年MM月DD日'))
            }
        },
        {  key: 'fuel', width: 85 },
        {
            key: 'license',
            render(h, { row }) {
                return h('div', {}, row.license ? '是' : '否')
            }
        }
    ]

    
    // 遍历o数组，看看o数组当中谁的key与store中的sort中的sortby相同，就表示按这个对象排序
    for(let i = 0;i < o.length;i++){
        // 补充title属性
        // 将o对象中的title全删除，动态从dictionary中读取key，给每一项补充title属性
        o[i].title = dictionary[o[i].key]
        if(o[i].key === store.state.largeTableStore.sort.sortby){
            // 补充sortType属性，让他有默认初始排序
            o[i].sortType = store.state.largeTableStore.sort.sortdirection == 1 ? 'asc' : 'desc'
        }
    }


    // 读取本地存储，按照本地存储的顺序进行排序
    if (localStorage.getItem('colSort')){
        let sortArr = JSON.parse(localStorage.getItem('colSort'))
        // 根据本地存储的顺序，重写列表的顺序和内容
        return sortArr.map(item => {
            for (let i = 0; i < o.length; i++) {
                if (o[i].key === item) {
                    return o[i]
                }
            }
        })
    }


}