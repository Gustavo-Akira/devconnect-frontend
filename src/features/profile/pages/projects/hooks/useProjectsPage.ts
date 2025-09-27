import { useEffect, useState } from 'react';
import { useAuth } from '../../../../../shared/context/auth/authContext';
import {
  createProject,
  getProjectsByDevProfileId,
  editProject as editProjectCall,
  deleteProject,
} from '../../../../../shared/infra/services/projects/projectService';
import type {
  CreateProjectDTO,
  Project,
} from '../../../../../shared/infra/services/projects/interface';

export const useProjectsPage = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState<number>(0);
  const [size, setSize] = useState<number>(5);
  const [totalElements, setTotalElements] = useState<number>(0);
  const devProfileId = useAuth().user!.id;
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [editProject, setEditProject] = useState<Project | null>(null);
  const [reloadFlag, setReloadFlag] = useState<number>(0);

  const reload = () => setReloadFlag((prev) => prev + 1);
  useEffect(() => {
    setLoading(true);
    getProjectsByDevProfileId(devProfileId, page, 5)
      .then((data) => {
        setProjects(data.content);
        setTotalElements(data.totalElements);
      })
      .catch((err) => {
        setError('Failed to fetch projects');
        console.error(err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [page, devProfileId, reloadFlag]);

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };

  const handleSizeChange = (newSize: number) => {
    setSize(newSize);
    setPage(0);
  };

  const handleDelete = async (id: string) => {
    try {
      setLoading(true);
      await deleteProject(id);
      setLoading(false);
      reload();
    } catch (error) {
      console.error('error to delete project', error);
      setError('Failed to delete the project');
    }
  };

  const handleModalSubmit = async (data: CreateProjectDTO) => {
    try {
      if (editProject) {
        await editProjectCall({ ...data, id: editProject.id });
      } else {
        await createProject(data);
      }
    } catch (error) {
      console.error('Error submitting project:', error);
      setError('Failed to submit project');
    }
    reload();
    setOpenModal(false);
    setEditProject(null);
  };

  const handleEditButton = (project: Project) => {
    setEditProject(project);
    setOpenModal(true);
  };
  return {
    state: {
      projects,
      loading,
      error,
      page,
      size,
      totalElements,
      devProfileId,
      openModal,
      editProject,
      reloadFlag,
    },
    actions: {
      handlePageChange,
      handleSizeChange,
      setOpenModal,
      setEditProject,
      handleModalSubmit,
      handleEditButton,
      handleDelete,
    },
  };
};
