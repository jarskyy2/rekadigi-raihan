import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createCustomer } from "@/lib/action";
import { useRouter } from 'next/navigation';

export const useCreateCustomer = () => {
    const queryClient = useQueryClient();
    const router = useRouter();

    return useMutation({
        mutationFn: createCustomer,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['customer'] });
            router.push('/');
        },
        onError: () => {
            console.log('error');
        }
    })

}