import { useFrappeDocTypeEventListener, useFrappeGetCall, useSWRConfig } from "frappe-react-sdk";
import { PropsWithChildren, createContext, useEffect, useMemo, useState } from "react";
import { ErrorBanner } from "@/components/common/ErrorBanner";
import { Box, Flex, Link, Text } from "@radix-ui/themes";
import { FormLynkUser } from "@/types/FormLynk/FormLynkUser";
import { Stack } from "@/components/common/Stack";


export const UserListContext = createContext<{ users: UserFields[], enabledUsers: UserFields[] }>({
    users: [],
    enabledUsers: []
})

export type UserFields = Pick<FormLynkUser, 'name' | 'full_name' | 'user_image' | 'first_name' | 'enabled' | 'type' | 'availability_status' | 'custom_status'>

export const UserListProvider = ({ children }: PropsWithChildren) => {


    const { mutate: globalMutate } = useSWRConfig()
    const { data, error: usersError, mutate, isLoading } = useFrappeGetCall<{ message: UserFields[] }>('form_link.api.user.get_list', undefined, 'form_link.api.users.get_list', {
        revalidateOnFocus: false,
        revalidateOnReconnect: false,
    })

    const [newUpdatesAvailable, setNewUpdatesAvailable] = useState(false)

  
    const { users, enabledUsers } = useMemo(() => {
        return {
            users: data?.message ?? [],
            enabledUsers: data?.message?.filter(user => user.enabled === 1) ?? []
        }
    }, [data])

    if (isLoading) {
        return <Flex justify='center' align='center' height='100vh' width='100vw' className='animate-fadein'>
            <Stack className='text-center' gap='1'>
                <Text size='7' className='cal-sans tracking-normal'>FormLynk</Text>
                <Text color='gray' weight='medium'>Getting things ready...</Text>
            </Stack>
        </Flex>
    }
    if (usersError) {
        return <Flex align='center' justify='center' px='4' mx='auto' className="w-[50vw] h-screen">
            <ErrorBanner error={usersError}>
                <Box py='2'>
                    <Text size='3' className='cal-sans'>Unable to fetch users</Text>
                    <Text size='2' color='gray' className='cal-sans'>Please try again later or contact support.</Text>
                    
                </Box>
            </ErrorBanner>
        </Flex>
    }

    return <UserListContext.Provider value={{ users, enabledUsers }}>
        {children}
    </UserListContext.Provider>
}