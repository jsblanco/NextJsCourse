import Button from '../ui/Button';
import classes from './ErrorAlert.module.css';

function ErrorAlert({ link, message }: { link: string, message: string }) {
    return <>
        <div className={classes.alert}><p>{message}</p></div>
        <div className="center">
            <Button link={link}>Return</Button>
        </div>
    </>


}

export default ErrorAlert;
