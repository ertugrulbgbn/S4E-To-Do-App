const {
    data: isHaveAlertList,
    isLoading: isLoadingAlertList,
    refetch: refetchAlertList,
    isError: isErrorAlertList,
    isRefetching: isRefetchingAlertList,
} = useQuery('getAlertList', () => getAlertSettings({ integration_type_id: integration_type_id }), { enabled: false, staleTime: Infinity });

export const getAlertSettings = async ({ integration_type_id }: { integration_type_id: number }) => {
    const response = await api.post(`${serviceKey}/get`, {
        integration_type_id: integration_type_id,
    });

    if (handleError(response.data)) {
        return;
    }

    return response.data;
};

const serviceKey = 'alert-settings';

EMAIL = 5, 