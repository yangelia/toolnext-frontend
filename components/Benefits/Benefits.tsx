import style from "./Benefits.module.css";

export default function Benefits() {
return (
    <section className={style.container}>
        <div className={style.benefits}>
        <div >
            <div className={style.benefitWrapper}>
                <h2 className={style.benefitTitle}>ToolNext — платформа для швидкої та зручної оренди інструментів</h2>
                <p  className={style.benefitText}>ToolNext допомагає знайти потрібний інструмент у декілька кліків.
Користувачі можуть легко орендувати обладнання для ремонту чи хобі, а власники — зручно керувати своїми оголошеннями.
Ми створили сервіс, щоб зробити процес оренди простим, доступним і вигідним для всіх.
                </p>
            </div>
            <ul className={style.list}>
                <li className={style.item}>
                    <span className={style.iconWrapper}>
                        <svg className={style.icon}>
                        <use href="/icons/sprite.svg#icon-tools-access"></use> 
                    </svg>
                    </span>
                    <h4 className={style.title}>
Легкий доступ до інструментів
                    </h4>
                    <p className={style.text}>
                        Знаходьте потрібний інструмент у своєму районі без зайвих дзвінків і пошуків. Просто введіть назву — і отримайте варіанти поруч із вами.
                    </p>
                </li>
                <li className={style.item}>
                    <span className={style.iconWrapper}>
                        <svg className={style.icon}>
                        <use href="/icons/sprite.svg#icon-quick-booking"></use> 
                    </svg>
                    </span>
                    <h4 className={style.title}>
Швидке бронювання
                    </h4>
                <p className={style.text}>
Бронюйте інструменти в кілька кліків. Жодних складних форм чи довгих очікувань — тільки простий та зручний процес.
                </p>
                </li>
                <li className={style.item}>
                    <span className={style.iconWrapper}>
                        <svg className={style.icon}>
                        <use href="/icons/sprite.svg#icon-easy-manage"></use> 
                    </svg>
                    </span>
                    <h4 className={style.title}>
Зручне управління
                    </h4>
                <p className={style.text}>
Додавайте свої інструменти в каталог, редагуйте оголошення та контролюйте оренду. ToolNext допомагає перетворити зайві інструменти на додатковий дохід.
                </p>
                </li>
            </ul>
        </div>
        </div>
    </section>
)

};
