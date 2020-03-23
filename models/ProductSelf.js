
var keystone = require('keystone');
var Types = keystone.Field.Types;
var ProductSelf = new keystone.List('ProductSelf',{
	map: { name:'title' },
	singular: 'Продукт',
	plural: 'Продукты',
	autokey: { path:'slug', from:'title', unique:true }
});
	ProductSelf.add({
		title: { type: String,required: true },
		productSubCategory: {
			type: Types.Relationship,
			ref: 'ProductSubCategory',
			index: true,
			many: true
		},
	  	productCategory: {
			type: Types.Relationship,
			ref: 'ProductCategory',
			index: true,
			many: true
		},
	  	image: { type: Types.CloudinaryImages },
		'Артикул': { type: String },
		'Производитель': { type: String, index: true },
		'Тип водонагревателя': {
			type: Types.Select,
			options: 'выбрать вариант, накопительный, проточный',
			default: 'выбрать вариант',
			index: true
		},
		'Тип котла': {
			type: Types.Select,
			options: 'выбрать вариант, газовый, жидкотопливный, комбинированный, твердотопливный, электрический',
			default: 'выбрать вариант',
			index: true
		},
		'Принцип работы газового котла': {
			type: Types.Select,
			options: 'выбрать вариант, стандартный, конденсационный',
			default: 'выбрать вариант',
			index: true
			},
		'Принцип работы твердотопливного котла': {
			type: Types.Select,
			options: 'выбрать вариант, длительного горения, пеллетный, пиролизный, стандартный',
			default: 'выбрать вариант',
			index: true
			},
		'Вид тяги': {
			type: Types.Select,
			options: 'выбрать вариант, принудительная, естественная',
			default: 'выбрать вариант'
			},
		'Топливо': {
			type: Types.Select,
			options: [
				'выбрать вариант',
				'дизель',
				'древесина',
				'кокс',
				'пеллеты',
				'природный газ',
				'сжиженный газ',
				'солома',
				'торфобрикеты/торф',
				'уголь',
				'электричество'
			],
			// initial: true,
			many: true
			},
		'Вид теплоносителя': {
			type: Types.Select,
			options: 'выбрать вариант, вода, этиленгликоль, пропиленгликоль, смеси',
			default: 'выбрать вариант'
			},
		'КПД (%)': { type: Number, index: true },
		'Максимальный расход топлива (м3/час)': { type: Number },
		'Площадь обогрева (кв м)': { type: Number, index: true },
		'Тип управления': {
			type: Types.Select,
			options: 'выбрать вариант, механическое, электронное',
			default: 'выбрать вариант',
			index: true
			},
		'Тип розжига': {
			type: Types.Select,
			options: 'выбрать вариант, автоматический, ручной, пьезоэлектрический',
			default: 'выбрать вариант',
			index: true
			},
		'Диапазон температуры отопления (°С)': { type: String },
		'Диапазон температуры водоснабжения (°С)': { type: String },
		'Время нагрева (мин)': { type: String },
		'Способ нагрева': {
			type: Types.Select,
			options: 'выбрать вариант, газовый, комбинированный, косвенный, электрический',
			default: 'выбрать вариант',
			index: true
			},
		'Производительность (л/мин)': { type: Number, index: true },
		'Тип камеры сгорания': {
			type: Types.Select,
			options: 'выбрать вариант, закрытая, открытая',
			default: 'выбрать вариант',
			index: true
		},
		'Форма бака': {
			type: Types.Select,
			options: 'выбрать вариант, цилиндрическая, плоская',
			default: 'выбрать вариант'
		},
		'Нагревательный элемент': {
			type: Types.Select,
			options: 'выбрать вариант, трубчатый, спиральный, сухой, мокрый',
			default: 'выбрать вариант'
		},
		'Давление на входе (min атм)': { type: Number },
		'Давление на входе (max атм)': { type: Number },
		'Максимальная температура нагрева воды (°С)': { type: Number, index: true },
		'Напряжение сети (B)': { type: String },
		'Тип бака': {
			type: Types.Select,
			options: 'выбрать вариант, безнапорный, напорный',
			default: 'выбрать вариант',
			index: true
			},
		'Тепловая мощность (кВт)': { type: Number, index: true },
		'Электрическая мощность (кВт)': { type: Number, index: true },
		'Цена': { type: Number, index: true },
		'Отображать цену в грн': { type: Boolean, default: false },
		'Страна производитель': { type: String, index: true },
		'Назначение котла': {
			type: Types.Select,
			options: 'выбрать вариант, двухконтурный, одноконтурный',
			default: 'выбрать вариант',
			index: true
			},
		'Способ установки': {
			type: Types.Select,
			options: 'выбрать вариант, навесной, напольный',
			default: 'выбрать вариант',
			index: true
			},
		'Материал теплообменника': {
			type: Types.Select,
			options: 'выбрать вариант, сталь, нержавеющая сталь, чугун, медь',
			default: 'выбрать вариант'
			},
		'Емкость водонагревателя (л)': { type: Number, index: true },
		'Тип насоса': {
			type: Types.Select,
			options: 'выбрать вариант, глубинный, дренажный, поверхностный, погружной, фекальный (канализационный), циркуляционный',
			default: 'выбрать вариант',
			index: true
			},
		'Автоподжиг': { type:Boolean },
		'Автоматическое включение': { type:Boolean },
		'Автоматическое выключение': { type:Boolean },
		'Индикатор включения': { type:Boolean },
		'Ускоренный нагрев': { type:Boolean },
		'Термометр': { type:Boolean },
		'Самодиагностика': { type:Boolean },
		'Дисплей': { type:Boolean },
		'Пульт ДУ': { type:Boolean },
		'Газ-контроль': { type:Boolean },
		'Ограничение температуры нагрева': { type:Boolean },
		'Защита от перегрева': { type:Boolean },
		'Предохранительный клапан': { type:Boolean },
		'Подводка': {
			type: Types.Select,
			options: 'выбрать вариант, боковая, верхняя, нижняя',
			default: 'выбрать вариант',
			index: true
			},
		'Уровень защиты от воды': {
			type: Types.Select,
			options: 'выбрать вариант, 1, 2, 3, 4, 5, 6, 7, 8',
			default: 'выбрать вариант'
			},
		'Ширина (мм)': { type:Number },
		'Высота (мм)': { type:Number },
		'Глубина (мм)': { type:Number },
		'Вес (кг)': { type:Number, index: true },
		'Описание': { type: Types.Html, height: 400, wysiwyg:true },
		'Гарантия': { type: String, index: true },
		'В наличии': { type: Boolean, default: true },
		'Не отображать на сайте': { type: Boolean, default: false },
		'Акционная цена': { type: Number },
		'Конец акции': { type: Date },
		createdAt: { type: Date, default: Date.now }
	});

	ProductSelf.schema.pre('validate', function (next) {
		if (!this.isNew && !this['Цена']) {
			next(Error('Укажите цену продукта!'));
		}
		if (!this.isNew && this.image.length < 1) {
			next(Error('Нужно добавить изображение к товару!'))
		} else {
			next();
		}
	});

	ProductSelf.register();