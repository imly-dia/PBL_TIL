import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { Database } from '../types/lion'; 

type Lion = Database['public']['Tables']['lions']['Row'];

export const useLions = () => {
  const [lions, setLions] = useState<Lion[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchLions = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('lions')
        .select('*')
        .order('created_at', { ascending: false }); 

      if (error) throw error;
      setLions(data || []);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };


  const addLion = async (newLion: Omit<Lion, 'id' | 'created_at'>) => {
    try {
      const { data, error } = await supabase
        .from('lions')
        .insert([newLion] as any) 
        .select();

      if (error) throw error;
      if (data) setLions((prev) => [data[0], ...prev]); 
    } catch (err: any) {
      alert(`추가 실패: ${err.message}`);
    }
  };

 
  const deleteLion = async (id: number) => {
    try {
      const { error } = await supabase
        .from('lions')
        .delete()
        .eq('id', id);

      if (error) throw error;
      setLions((prev) => prev.filter((lion) => lion.id !== id));
    } catch (err: any) {
      alert(`삭제 실패: ${err.message}`);
    }
  };

  
  useEffect(() => {
    fetchLions();
  }, []);


  return { 
    members: lions, 
    status: error ? "에러 발생" : "정상", 
    isLoading: loading, 
    fetchLions, 
    addMember: addLion, 
    deleteLion,
    retryLastAction: fetchLions 
  };
};