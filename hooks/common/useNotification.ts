import { useCallback, useEffect, useLayoutEffect, useState } from "react";
import messaging from "@react-native-firebase/messaging";
import { Alert, Platform } from "react-native";
import { PermissionsAndroid } from "react-native";
import PushNotificationIOS, {
	PushNotification
} from "@react-native-community/push-notification-ios";

interface Notification {
	title: string;
	body: string;
	data: NotificationData;
}

const dataKeys = ["title", "body"] as const;

type DataKey = (typeof dataKeys)[number];

type NotificationData = Record<DataKey, string>;

const useNotification = () => {
	const [notification, setNotification] = useState<Notification>({
		title: "",
		body: "",
		data: {
			title: "",
			body: ""
		}
	});

	const requestUserPermission = async () => {
		if (Platform.OS === "android") {
			// eslint-disable-next-line @typescript-eslint/ban-ts-comment
			// @ts-ignore
			PermissionsAndroid.request(
				PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS
			);
		}
		const authStatus = await messaging().requestPermission({
			providesAppNotificationSettings: true
		});
		const enabled =
			authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
			authStatus === messaging.AuthorizationStatus.PROVISIONAL;

		if (!enabled) {
			console.log("알림 권한을 허용해주세요.");
		}
	};

	useEffect(() => {
		messaging()
			.getToken()
			.then((token) => {
				console.log("token", token);
			});
	}, []);

	// NOTE : 앱이 실행중일 때 알림을 받았을 때
	useEffect(() => {
		const unsubscribe = messaging().onMessage(async (remoteMessage) => {
			setNotification({
				title: remoteMessage.notification?.title || "",
				body: remoteMessage.notification?.body || "",
				data: (remoteMessage.data as unknown as NotificationData) || {
					data: {
						title: "",
						body: ""
					}
				}
			});
		});
		return unsubscribe;
	}, []);

	// NOTE : Background 상태에서 알림을 받을 때
	const onRemoteNotification = (notification: PushNotification) => {
		setNotification({
			title: notification.getTitle() || "",
			body: (notification.getAlert() as string) || "",
			data: (notification.getData() as unknown as NotificationData) || {
				data: {
					title: "",
					body: ""
				}
			}
		});

		const result = PushNotificationIOS.FetchResult.NoData;
		notification.finish(result);
	};

	useLayoutEffect(() => {
		const type = "localNotification";
		PushNotificationIOS.addEventListener(type, onRemoteNotification);

		return () => {
			PushNotificationIOS.removeEventListener(type);
		};
	}, []);

	return { notification, requestUserPermission };
};

export default useNotification;
