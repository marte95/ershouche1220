export default (store) =>{
    let o = [
        {
            title: '缩略图', key: 'avatar',
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
        { title: '编号', key: 'id', sortable: 'custom' },
        { title: '品牌', key: 'brand' },
        { title: '型号', key: 'series' },
        { title: '颜色', key: 'color' },
        { title: '价格', key: 'price', sortable: 'custom' },
        { title: '档位', key: 'gearbox' },
        { title: '排量', key: 'engine' },
        { title: '环保', key: 'exhaust' },
        { title: '公里数', key: 'km', sortable: 'custom' },
        { title: '购买时间', key: 'buydate' },
        { title: '燃料', key: 'fuel' },
        {
            title: '是否含牌', key: 'license',
            render(h, { row }) {
                return h('div', {}, row.license ? '是' : '否')
            }
        }
    ]

    
    // 遍历o数组，看看o数组当中谁的key与store中的sort中的sortby相同，就表示按这个对象排序
    for(let i = 0;i < o.length;i++){
        if(o[i].key === store.state.largeTableStore.sort.sortby){
            // 补充sortType属性，让他有默认初始排序
            o[i].sortType = store.state.largeTableStore.sort.sortdirection == 1 ? 'asc' : 'desc'
        }
    }


    return o;
}