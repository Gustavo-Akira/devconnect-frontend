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
import { useNotification } from '../../../../../shared/context/notification/notificationContext';
import { formatBackendError } from '../../../../../shared/infra/utils/formatBackendError';

export const useProjectsPage = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [page, setPage] = useState<number>(0);
  const [size, setSize] = useState<number>(5);
  const [totalElements, setTotalElements] = useState<number>(0);
  const devProfileId = String(useAuth().user!.id);
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [editProject, setEditProject] = useState<Project | null>(null);
  const [reloadFlag, setReloadFlag] = useState<number>(0);
  const { showNotification } = useNotification();
  const reload = () => setReloadFlag((prev) => prev + 1);

  useEffect(() => {
    setLoading(true);
    getProjectsByDevProfileId(devProfileId, page, 5)
      .then((data) => {
        setProjects(data.content);
        setTotalElements(data.totalElements);
      })
      .catch((err) => {
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
      showNotification('Project deleted successfully', 'success');
    } catch (error) {
      const msg = formatBackendError(error);
      console.error('error to delete project', error);
      showNotification('Failed to delete the project: ' + msg, 'error');
    }
  };

  const handleModalSubmit = async (data: CreateProjectDTO) => {
    try {
      if (editProject) {
        await editProjectCall({ ...data, id: editProject.id });
        showNotification('Project updated successfully', 'success');
      } else {
        await createProject(data);
        showNotification('Project created successfully', 'success');
      }
    } catch (error) {
      const msg = formatBackendError(error);
      console.error('Error submitting project:', error);
      showNotification('Failed to submit the project: ' + msg, 'error');
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
