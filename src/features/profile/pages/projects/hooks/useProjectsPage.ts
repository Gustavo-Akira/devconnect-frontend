import { useEffect, useState } from 'react';
import { useAuth } from '../../../../../shared/context/auth/authContext';
import { getProjectsByDevProfileId } from '../../../../../shared/infra/services/projects/projectService';
import type { Project } from '../../../../../shared/infra/services/projects/interface';

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
  }, [page, devProfileId]);

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };

  const handleSizeChange = (newSize: number) => {
    setSize(newSize);
    setPage(0);
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
      editProject
    },
    actions: {
      handlePageChange,
      handleSizeChange,
      setOpenModal,
      setEditProject
    },
  };
};
