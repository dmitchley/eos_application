import { getStatusBarHeight } from 'react-native-status-bar-height';
import HUD, { LoadingHUD } from 'react-native-hud-hybrid';

export const white = "#FFF"
export const offWhite = "#fbf5ed"
export const buttonColor = '#e7613f'
export const gradient1 = '#fbf5ed'
export const gradient2 = '#f8e3d8'
export const blueText = '#375a63'

// export const serverToken = "AAAAVZaVbRY:APA91bH-FVOU0r46cm0tCH7DFhU-mQD3jlAgPABNh-Q91NOEa5TfpLmiWY03ih5-6eCHfCHt7biwMNQcAyXcw-45bVxAdhKFO8-ZTdyleUTBJnHbkxJHEUe_lzY4vJUXNmta1wzxPnRk"
export const serverToken = "AAAAqbki4ZI:APA91bGa3UFzS8b9ZgkXryD1SHrooC9Nqo39HcwCxCwCM34TxY001UqO9aUzBJZqw8SHfMrpiojaR9oKl4LNLj9ow-z36sQN6RbYN4sIhGD5mmwQhD4q_tWYOBT1mJw0JQ_Sv3cBahUQ"

export const statusbarHeight = getStatusBarHeight();

const loadingHUD = new LoadingHUD();
export const showHUD = (text) => {
    loadingHUD.show(text);
}

export const hideHUD = () => {
    loadingHUD.hideAll();
}