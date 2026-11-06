import { useFrappeGetCall } from 'frappe-react-sdk'

const useIsPushNotificationEnabled = () => {

    const { data } = useFrappeGetCall<{ message: boolean }>('form_link.api.notification.are_push_notifications_enabled', undefined, undefined, {
        revalidateIfStale: true,
        revalidateOnFocus: false,
        revalidateOnReconnect: false,
    })

    return data?.message ? true : false
}

export default useIsPushNotificationEnabled

