import styles from "./account-form.module.css"
import { ReactNode, FC } from "react";

type Props = {
    title: string
    inputs: ReactNode
    additional: ReactNode
}

const AccountForm: FC<Props> = ({title, inputs, additional}) => {
    return (
        <div className={styles.root}>
            <div className={styles.form}>
                <span className="text text_type_main-medium m-2">{title}</span>
                {inputs}
            </div>
            <div>
                <div className={styles.additional}>
                    {additional}
                </div>
            </div>
        </div>
    )
}

export default AccountForm;