import Card from '../../../shared/ui/Card'
import TemperatureToggle from '../../preferences/components/TemperatureToggle';
import styles from "./CurrentWeatherPanelMobile.module.scss"
import { CloudSun } from 'lucide-react';

export function CurrentWeatherPanelMobile() {

    return (
        <Card height={"auto"} width={"100%"} >
            <div className={styles.container}>
                {/* <div className={styles.location}>
                    <MapPin size={16} />
                    <p>Oulu, FI</p>
                </div>
                <div className={styles.date}>
                    <p>Sunday</p>
                    <p>Apr 26, 2026</p>
                </div> */}
                <div className={styles.weatherInfoContainer}>
                    <CloudSun size={80} />
                    <div className={styles.weatherInfo}>
                        <p className={styles.temperature}><span className={styles.temperatureValue}>15</span> <span className={styles.tempUnit}>°C</span></p>
                        <p className={styles.description}>Partly Cloudy</p>
                        <p className={styles.highLow}>H: 17°C L: 10°C</p>
                        <p className={styles.feelsLike}>Feels like 13°C</p>
                        <TemperatureToggle /> {/* Add the temperature toggle component here */}
                    </div>
                </div>
            </div>

        </Card >
    )
}
