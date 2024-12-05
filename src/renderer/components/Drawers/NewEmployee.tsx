import React, { FC, useState } from 'react';
import { TextField, Button, Container, Box, Card, CardHeader, CardContent, Divider, Radio, RadioGroup, FormControlLabel, Grid, Typography } from '@mui/material';
import { useSelector } from 'react-redux';
import { RootState, useAppDispatch } from '../../store';
import LoadingScreen from '../Basic/LoadingScreen';
import AlertModal from '../Basic/Alert';
import Fieldset from '../Basic/Fieldset';
import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';

interface NewEmployeeProps {
  onClose: () => void;
}

const NewEmployee: FC<NewEmployeeProps> = ({ onClose }) => {
  const [formData, setFormData] = useState < any > ({
    firstName: '',
    lastName: '',
    middleName: '',
    address1: '',
    address2: '',
    city: '',
    state: '',
    zip: '',
    homePhone: '',
    workPhone: '',
    mobilePhone: '',
    hiredDate: null,
    applicationType: 'Both',
  });
  const [isLoading, setIsLoading] = useState < boolean > (false);
  const [confirmModalOpen, setConfirmModalOpen] = useState < boolean > (false);
  const [confirmTitle, setConfirmTitle] = useState < string > ('');
  const [confirmDescription, setConfirmDescription] = useState < string > ('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData: any) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const validateForm = () => {
    if (!formData.firstName || !formData.lastName || !formData.hiredDate) {
      setConfirmTitle('Required fields are missing');
      setConfirmDescription('Please fill out all required fields.');
      setConfirmModalOpen(true);
      return false;
    }
    return true;
  };

  const handleSave = async () => {
    if (validateForm()) {
      setIsLoading(true);
      try {
        // Add save logic here
      } catch (error: any) {
        setConfirmTitle(error.message);
        setConfirmDescription('');
        setConfirmModalOpen(true);
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <Container maxWidth={false}>
      <LoadingScreen show={isLoading} />
      <Box sx={{ pt: 3 }}>
        <Card variant="outlined">
          <CardHeader title="Create Employee"
            action={
              <Box display={'flex'} alignItems={'center'} sx={{ pt: 1 }}>
                <Button variant="contained" onClick={handleSave} sx={{ mr: 2, background: (theme) => `${theme.palette.background.paper}`, color: (theme) => `${theme.palette.primary.dark}` }}>
                  Save
                </Button>
                <Button variant="outlined" onClick={onClose} sx={{ mr: 5, background: (theme) => `${theme.palette.background.paper}`, color: (theme) => `${theme.palette.primary.dark}` }}>
                  Cancel
                </Button>
              </Box>
            }
          />
          <Divider />
          <CardContent>
            <Fieldset title="Application">
              <RadioGroup
                row
                value={formData.applicationType}
                onChange={handleInputChange}
                name="applicationType"
                sx={{ justifyContent: 'space-between', width: '85%' }}
              >
                <FormControlLabel
                  value="Both"
                  control={<Radio />}
                  label="Both Quicks and TimeLive"
                />
                <FormControlLabel
                  value="QuickBooks"
                  control={<Radio />}
                  label="QuickBooks Only"
                />
                <FormControlLabel
                  value="TimeLive"
                  control={<Radio />}
                  label="TimeLive Only"
                />
              </RadioGroup>
            </Fieldset>
            <Fieldset title="Parameters">
              <Grid container spacing={5} sx={{ p: 3 }}>
                <Grid item xs={12} sm={6}>
                  <Box sx={{ mb: 3 }}>
                    <TextField
                      fullWidth
                      required
                      label="First Name"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleInputChange}
                    />
                  </Box>
                  <Box sx={{ mb: 3 }}>
                    <TextField
                      fullWidth
                      required
                      label="Last Name"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleInputChange}
                    />
                  </Box>
                  <Box sx={{ mb: 3 }}>
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                      <DatePicker
                        label="Hired Date"
                        value={formData.hiredDate ? new Date(formData.hiredDate) : null}
                        onChange={(newValue) => {
                          setFormData((prevData: any) => ({
                            ...prevData,
                            hiredDate: newValue,
                          }));
                        }}
                        slotProps={{
                            textField: {
                              fullWidth: true,
                            },
                          }}
                      />
                    </LocalizationProvider>
                  </Box>
                  <Box sx={{ mb: 3 }}>
                    <TextField
                      fullWidth
                      label="Home Phone"
                      name="homePhone"
                      value={formData.homePhone}
                      onChange={handleInputChange}
                    />
                  </Box>
                  <Box sx={{ mb: 3 }}>
                    <TextField
                      fullWidth
                      label="Work Phone"
                      name="workPhone"
                      value={formData.workPhone}
                      onChange={handleInputChange}
                    />
                  </Box>
                  <Box sx={{ mb: 3 }}>
                    <TextField
                      fullWidth
                      label="Mobile Phone"
                      name="mobilePhone"
                      value={formData.mobilePhone}
                      onChange={handleInputChange}
                    />
                  </Box>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Box sx={{ mb: 3 }}>
                    <TextField
                      fullWidth
                      label="Middle Name"
                      name="middleName"
                      value={formData.middleName}
                      onChange={handleInputChange}
                    />
                  </Box>
                  <Box sx={{ mb: 3 }}>
                    <TextField
                      fullWidth
                      label="Address Line 1"
                      name="address1"
                      value={formData.address1}
                      onChange={handleInputChange}
                    />
                  </Box>
                  <Box sx={{ mb: 3 }}>
                    <TextField
                      fullWidth
                      label="Address Line 2"
                      name="address2"
                      value={formData.address2}
                      onChange={handleInputChange}
                    />
                  </Box>
                  <Box sx={{ mb: 3 }}>
                    <TextField
                      fullWidth
                      label="City"
                      name="city"
                      value={formData.city}
                      onChange={handleInputChange}
                    />
                  </Box>
                  <Box sx={{ display: 'flex', gap: 2 }}>
                    <TextField
                      fullWidth
                      label="State"
                      name="state"
                      value={formData.state}
                      onChange={handleInputChange}
                    />
                    <TextField
                      fullWidth
                      label="ZIP"
                      name="zip"
                      value={formData.zip}
                      onChange={handleInputChange}
                    />
                  </Box>
                </Grid>
              </Grid>
            </Fieldset>
            <Box sx={{ pt:3, pl: 8 }}>
                <Typography>Note: Hired date is used as the TimeLive Password</Typography>
            </Box>
          </CardContent>
        </Card>
      </Box>
      <AlertModal
        show={confirmModalOpen}
        onClose={() => setConfirmModalOpen(false)}
        title={confirmTitle}
        description={confirmDescription}
      />
    </Container>
  );
};

export default NewEmployee;
