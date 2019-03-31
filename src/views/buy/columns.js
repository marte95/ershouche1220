export default [
    { 
        title: '缩略图', key: 'avatar',
        render(h, {row}){
            console.log(row)
            // 这是JSX语法
            return h('div', {attrs: {'data-id': row.id}}, [
                h('LoadingGifImage', {
                    attrs: {
                        w: 90 * 1.2,
                        h: 60 * 1.2,
                        src: `http://192.168.1.88/images/carimages_small/${row.id}/view/${row.avatar}`
                    }
                } , '')
            ])
        }
    },
    { title: '品牌', key: 'brand'},
    { title: '型号', key: 'series'},
    { title: '颜色', key: 'color'},
    { title: '价格', key: 'price'},
    { title: '档位', key: 'gearbox'},
    { title: '排量', key: 'engine'},
    { title: '公里数', key: 'km'},
    { title: '购买时间', key: 'buydate'},
    { title: '燃料', key: 'fuel'}
]