import React, { FC, useEffect, useState, useMemo } from 'react';
import {
    Button, Container, Box, Divider, Card, CardHeader, Grid, CardContent, IconButton
} from '@mui/material';
import { RootState, useAppDispatch } from '../store';
import { useSelector } from 'react-redux';
import LoadingScreen from '../components/Basic/LoadingScreen';

const Settings: FC = () => {
    const dispatch = useAppDispatch();
    const [isLoading, setIsLoading] = useState<boolean>(false);

    return (
        <Container maxWidth={false}>
            <LoadingScreen show={isLoading} />
            <Box sx={{ pt: 3 }}>
                <Card variant="outlined">
                    <CardHeader title="Settings"
                    />
                    <Divider />
                    <CardContent>

                    </CardContent>
                </Card>
            </Box>
        </Container>
    );
};

export default Settings;
