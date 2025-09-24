import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Grid, TextField, Typography } from "@mui/material"
import type { CreateProjectDTO, Project } from "../../../../../../shared/infra/services/projects/interface"
import { useState } from "react";

export const ProjectModal = ({open,onClose,onSubmit,data,devProfileId}:{open: boolean,onSubmit:(data: CreateProjectDTO)=>void,devProfileId: string,onClose:()=>void,data:Project|null}) => {
    const [info,setInfo] = useState<CreateProjectDTO>(
        {
            name: data? data.name : "",
            description: data? data.description : "",
            repoUrl: data? data.repoUrl : "",
            devProfileId
        });
    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>{data? "Edit Project":"Add Project"}</DialogTitle>
            <DialogContent>
                <Grid container spacing={1}>
                    <Grid size={{xs:12,sm:12,md:6,lg:6}}>
                        <TextField label="Project Name" value={info.name} fullWidth onChange={e=>setInfo({...info, name:e.target.value})}/>
                    </Grid>
                    <Grid size={{xs:12,sm:12,md:6,lg:6}}>
                        <TextField label="Repository URL" value={info.repoUrl} fullWidth onChange={e=>setInfo({...info, repoUrl:e.target.value})}/>
                    </Grid> 
                    <Grid size={12}>
                        <TextField label="Description" value={info.description} fullWidth multiline rows={4} onChange={e=>setInfo({...info, description:e.target.value})}/>
                    </Grid>
                </Grid>
            </DialogContent>
            <DialogActions>
                <Button onClick={()=>onSubmit(info)}>Submit</Button>
                <Button onClick={onClose}>Cancel</Button>
            </DialogActions>
        </Dialog>
    )
}