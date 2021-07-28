<p align="center">
  <img alt="react-native-nfc-rewriter" src="./images/nfc-rewriter-icon.png" width="300">
</p>
<p align="center">
  <h2 align="center">WaveAuth application</h2>
</p>

---

## How to Install

<h4> Lancer le projet sur mobile Android : </h4>

- Ouvrir un terminal et aller dans le répertoire projet
  exemple : cd Desktop/WaveAuth
  utiliser la commande <strong>"npm start"</strong> pour lancer le serveur React

- Connecter son téléphone en ayant activé le mode développer
  Vérifier que le téléphone aparait en tapant la commande <strong>"adb devices"</strong> dans un nouveau terminal

- Lancer Visual Studio + un terminal dans Visual Studio
  taper la commande <strong>"npx react-native run-android"</strong>

<h4> Lancer le projet sur mobile iPhone : </h4>

- (seulement possible sur MAC via Xcode)
  <a href="https://reactnative.dev/docs/running-on-device">Tuto dispo ici</a>

## Problème connu + résolution

- error Failed to install the app. Make sure you have the Android development environment set up: https://reactnative.dev/docs/environment-setup. Run
  CLI with --verbose flag for more details.

  _Résolution_ :

  - Vérifier que le device est reconnu : adb devices
  - Vérifier l'espace de stockage restant

- En cas de probème sur des componnents :
  Décommenter :
  CheckboxItem dans \src\components\Checkbox\Checkbox.tsx
  FABGroup dans \src\components\FAB\FAB.tsx
  RadioButtonItem dans \src\components\RadioButton\RadioButton.tsx
  AppbarHeader dans \src\components\Appbar\Appbar.tsx
  ToggleButtonRow dans \src\components\ToggleButton\ToggleButton.tsx

## To do list

- Ajouter la base de données Firestore
- Corriger le warning : []
- Mettre une vérification de la connexion internet au lancement de l'application
- Mettre à jour l'icon NFC (au moment du start authentication)
- Mettre à jour l'appli pour une utilisation iOS
  - Installation des pods pour le NFC
  - Mise à jour des Logo, de la version et du nom de l'application
  - Ajout de la base de données firestore
