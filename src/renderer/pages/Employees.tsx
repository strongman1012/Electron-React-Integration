import React, { FC, useEffect, useState, useMemo } from 'react';
import {
    DataGrid, Column, ColumnChooser, ColumnChooserSearch, ColumnChooserSelection, Position, SearchPanel, Paging, Pager, FilterRow
} from 'devextreme-react/data-grid';
import {
    Button, Container, Box, Divider, Card, CardHeader, Grid, CardContent, IconButton
} from '@mui/material';

import LoadingScreen from '../components/Basic/LoadingScreen';
import AddIcon from '@mui/icons-material/Add';
import { ModalTypes } from '../components/Utils/Global';
import Drawer from '../components/Basic/Drawer';
import NewEmployee from '../components/Drawers/NewEmployee';
import AutorenewIcon from '@mui/icons-material/Autorenew';

const searchEditorOptions = { placeholder: 'Search column' };

const Employees: FC = () => {

    const [isLoading, setIsLoading] = useState < boolean > (true);
    const [timeliveEmployees, setTimeliveEmployees] = useState < any > ([]);
    const [quickbooksEmployees, setQuickbooksEmployees] = useState < any > ([]);
    const [modalType, setModalType] = useState < string > (ModalTypes.new);
    const [editModalOpen, setEditModalOpen] = useState < boolean > (false);

    useEffect(() => {
        fetchAllEmployees();
    }, []);

    const fetchAllEmployees = async () => {
        setIsLoading(true); // Start loading before both fetch calls
        try {
            const [timeliveResponse, quickbooksResponse] = await Promise.all([
                fetchTimeliveEmployees(),
                fetchQuickbooksEmployees(),
            ]);

            if (timeliveResponse.success) {
                setTimeliveEmployees(timeliveResponse.data);
            } else {
                console.error('Error fetching TimeLive employees:', timeliveResponse.error);
            }

            if (quickbooksResponse.success) {
                setQuickbooksEmployees(quickbooksResponse.data);
            } else {
                console.error('Error fetching QuickBooks employees:', quickbooksResponse.error);
            }
        } catch (error) {
            console.error('Error fetching employees:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const fetchTimeliveEmployees = async () => {
        try {
            const response: any = await window.electron.ipcRenderer.invoke('fetch-timelive-employees');
            return response;
        } catch (error) {
            console.error('Error fetching TimeLive employees:', error);
            return { success: false, error };
        }
    };

    const fetchQuickbooksEmployees = async () => {
        try {
            const response: any = await window.electron.ipcRenderer.invoke('fetch-quickbooks-employees');
            return response;
        } catch (error) {
            console.error('Error fetching QuickBooks employees:', error);
            return { success: false, error };
        }
    };

    const handleCreate = () => {
        setModalType(ModalTypes.new);
        setEditModalOpen(true);
    }

    const timeliveDataGrid = useMemo(() => (
        <DataGrid
            id="timelive"
            key="timelive"
            dataSource={timeliveEmployees}
            keyExpr="AccountEmployeeId"
            columnAutoWidth={true}
            showRowLines={true}
            showBorders={true}
            allowColumnResizing={true}
            rowAlternationEnabled={true}
        >
            <FilterRow visible={true} />
            <SearchPanel
                visible={true}
                width={240}
                placeholder="Search..." />
            <Paging defaultPageSize={10} />
            <Pager
                showPageSizeSelector={true}
                allowedPageSizes={[10, 20, 30]}
                showInfo={true} />
            <Column
                dataField="FullName"
                caption="Name"
                allowHiding={false}
                calculateCellValue={(data) => `${data.FirstName || ''} ${data.LastName || ''}`}
            />
            <Column dataField='EMailAddress' caption='Email' />

            <ColumnChooser
                height='340px'
                enabled={true}
                mode="select"
            >
                <Position
                    my="right top"
                    at="right bottom"
                    of="#timelive .dx-datagrid-column-chooser-button"
                />
                <ColumnChooserSearch
                    enabled={true}
                    editorOptions={searchEditorOptions} />
                <ColumnChooserSelection
                    allowSelectAll={true}
                    selectByClick={true}
                    recursive={true} />
            </ColumnChooser>
        </DataGrid>
    ), [timeliveEmployees]);

    const quickbooksDataGrid = useMemo(() => (
        <DataGrid
            id="quickbooks"
            key="quickbooks"
            dataSource={quickbooksEmployees}
            keyExpr="GivenName"
            columnAutoWidth={true}
            showRowLines={true}
            showBorders={true}
            allowColumnResizing={true}
            rowAlternationEnabled={true}
        >
            <FilterRow visible={true} />
            <SearchPanel
                visible={true}
                width={240}
                placeholder="Search..." />
            <Paging defaultPageSize={10} />
            <Pager
                showPageSizeSelector={true}
                allowedPageSizes={[10, 20, 30]}
                showInfo={true} />
            <Column
                dataField="FullName"
                caption="Name"
                allowHiding={false}
                calculateCellValue={(data) => `${data.GivenName || ''} ${data.FamilyName || ''}`}
            />
            <Column dataField='PrimaryEmailAddr.Address' caption='Email' />

            <ColumnChooser
                height='340px'
                enabled={true}
                mode="select"
            >
                <Position
                    my="right top"
                    at="right bottom"
                    of="#quickbooks .dx-datagrid-column-chooser-button"
                />
                <ColumnChooserSearch
                    enabled={true}
                    editorOptions={searchEditorOptions} />
                <ColumnChooserSelection
                    allowSelectAll={true}
                    selectByClick={true}
                    recursive={true} />
            </ColumnChooser>
        </DataGrid>
    ), [quickbooksEmployees]);

    return (
        <Container maxWidth={false}>
            <LoadingScreen show={isLoading} />
            <Box sx={{ pt: 3 }}>
                <Card variant="outlined">
                    <CardHeader title="Employees"
                        action={
                            <Box display='flex' alignItems='center'>
                                <IconButton color='secondary' sx={{ mr: 2, border: '1px solid', borderRadius: 1, height: '2rem', width: '2rem' }} onClick={fetchAllEmployees}>
                                    <AutorenewIcon />
                                </IconButton>
                                <Button startIcon={<AddIcon />} variant="contained" sx={{ mr: 2, background: (theme) => `${theme.palette.background.paper}`, color: (theme) => `${theme.palette.primary.dark}` }}
                                    onClick={handleCreate}>
                                    New Employee
                                </Button>
                            </Box>
                        }
                    />
                    <Divider />
                    <CardContent>
                        <Grid container spacing={3}>
                            <Grid item sm={12} md={6}>
                                <Card variant='outlined'>
                                    <CardHeader title="Time Live" sx={{ height: '38px !important' }} />
                                    <Divider />
                                    <CardContent>
                                        {timeliveDataGrid}
                                    </CardContent>
                                </Card>
                            </Grid>
                            <Grid item sm={12} md={6}>
                                <Card variant='outlined'>
                                    <CardHeader title="Quickbooks" sx={{ height: '38px !important' }} />
                                    <Divider />
                                    <CardContent>
                                        {quickbooksDataGrid}
                                    </CardContent>
                                </Card>
                            </Grid>
                        </Grid>

                    </CardContent>
                </Card>
            </Box>

            {/* Employee Drawer */}
            <Drawer
                open={editModalOpen}
                onClose={() => setEditModalOpen(false)}
                onOpen={() => { }}>
                {
                    modalType === "new" ? <NewEmployee onClose={() => setEditModalOpen(false)} /> : <NewEmployee onClose={() => setEditModalOpen(false)} />
                }
            </Drawer>
        </Container>
    );
};

export default Employees;
